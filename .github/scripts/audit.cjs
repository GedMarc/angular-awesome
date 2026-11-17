const { spawnSync } = require('node:child_process');
const { packages } = require('../../package-lock.json');

// Remove this exception once a patched Picomatch release can be installed.
const picomatchAdvisory = 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf';

function checkAudit(report, status, { allowDevelopmentException = false, lockPackages = packages } = {}) {
  const findings = report?.vulnerabilities;
  const total = report?.metadata?.vulnerabilities?.total;
  if (report?.error || report?.auditReportVersion !== 2 || !findings || Array.isArray(findings) ||
      typeof findings !== 'object' || Object.keys(findings).length !== total ||
      status !== (total === 0 ? 0 : 1)) {
    throw new Error('npm audit failed to return a complete report.');
  }
  if (total === 0) return false;
  if (!allowDevelopmentException) throw new Error('The production dependency audit reported vulnerabilities.');

  let matchedAdvisory = false;
  const dependents = new Map();
  for (const [name, finding] of Object.entries(findings)) {
    if (!Array.isArray(finding?.nodes) || !finding.nodes.length ||
        !finding.nodes.every(path => lockPackages[path]?.dev === true) ||
        !Array.isArray(finding.via) || !finding.via.length) {
      throw new Error(`Unexpected or non-development audit finding for ${name}.`);
    }
    for (const cause of finding.via) {
      if (typeof cause === 'string' && Object.hasOwn(findings, cause)) {
        const names = dependents.get(cause) ?? [];
        names.push(name);
        dependents.set(cause, names);
        continue;
      }
      if (name === 'picomatch' && cause?.name === name && cause.url === picomatchAdvisory) {
        matchedAdvisory = true;
        continue;
      }
      throw new Error(`Unapproved audit finding for ${name}: ${cause?.url ?? cause}`);
    }
  }
  if (!matchedAdvisory) throw new Error('The audit did not identify the advisory behind its findings.');

  const related = new Set(['picomatch']);
  for (const name of related) {
    for (const dependent of dependents.get(name) ?? []) related.add(dependent);
  }
  if (related.size !== total) throw new Error('The audit reported findings unrelated to the approved advisory.');
  return true;
}

function runAudit({ production = false } = {}) {
  const args = ['audit', '--json', '--audit-level=low', ...(production ? ['--omit=dev'] : [])];
  const result = process.env.npm_execpath
    ? spawnSync(process.execPath, [process.env.npm_execpath, ...args], { encoding: 'utf8' })
    : spawnSync('npm', args, { encoding: 'utf8' });

  if (result.error) throw result.error;
  if (result.stderr) process.stderr.write(result.stderr);
  try {
    return checkAudit(JSON.parse(result.stdout), result.status, { allowDevelopmentException: !production });
  } catch (error) {
    if (result.stdout) process.stderr.write(result.stdout);
    throw error;
  }
}

if (require.main === module) {
  try {
    runAudit({ production: true });
    console.log('Production dependency audit passed.');
    if (runAudit()) {
      console.log(`Development dependency audit passed with a temporary exception for ${picomatchAdvisory}`);
    } else {
      console.log('Development dependency audit passed with no exceptions.');
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { checkAudit };
