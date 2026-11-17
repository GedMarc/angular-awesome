const assert = require('node:assert/strict');
const { test } = require('node:test');
const { checkAudit } = require('./audit.cjs');

const advisory = {
  name: 'picomatch',
  url: 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf'
};

function report(cause = advisory) {
  return {
    auditReportVersion: 2,
    metadata: { vulnerabilities: { total: 2 } },
    vulnerabilities: {
      picomatch: { nodes: ['node_modules/picomatch'], via: [cause] },
      builder: { nodes: ['node_modules/builder'], via: ['picomatch'] }
    }
  };
}

const dev = {
  allowDevelopmentException: true,
  lockPackages: {
    'node_modules/picomatch': { dev: true },
    'node_modules/builder': { dev: true }
  }
};

test('accepts a clean audit', () => {
  const clean = { ...report(), metadata: { vulnerabilities: { total: 0 } }, vulnerabilities: {} };
  assert.equal(checkAudit(clean, 0), false);
});

test('allows only the named advisory and related findings on development paths', () => {
  assert.equal(checkAudit(report(), 1, dev), true);
  assert.throws(() => checkAudit(report(), 1), /production dependency/);
  assert.throws(() => checkAudit(report(), 1, { ...dev, lockPackages: {} }), /non-development/);
});

test('blocks a different advisory, including on Picomatch', () => {
  assert.throws(() => checkAudit(report({ ...advisory, url: 'https://example.org/other' }), 1, dev), /Unapproved/);
  const additional = report();
  additional.vulnerabilities.builder.via.push({ name: 'builder', url: 'https://example.org/other' });
  assert.throws(() => checkAudit(additional, 1, dev), /Unapproved/);
});

test('blocks incomplete reports and audit execution failures', () => {
  assert.throws(() => checkAudit({ error: { code: 'E503' } }, 1, dev), /complete report/);
  assert.throws(() => checkAudit(report(), 2, dev), /complete report/);
  assert.throws(() => checkAudit(report('missing'), 1, dev), /Unapproved/);

  const unrelated = report();
  unrelated.vulnerabilities.builder.via = ['builder'];
  assert.throws(() => checkAudit(unrelated, 1, dev), /unrelated/);
});
