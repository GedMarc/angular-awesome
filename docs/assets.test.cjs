const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { test } = require('node:test');

function checkComponentAssets(docsDir) {
  const componentsDir = path.join(docsDir, 'components');
  const pages = fs.readdirSync(componentsDir).filter(file => file.endsWith('.html'));
  assert.ok(pages.length > 0, 'Expected component documentation');
  for (const page of pages) {
    const html = fs.readFileSync(path.join(componentsDir, page), 'utf8');
    // A legacy components.html fragment is not a full page and has no sidebar.
    const hasSidebar = /class=["'][^"']*sidebar-toggle/.test(html);
    let navigationScriptFound = false;
    for (const [tag] of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
      if (/^<link/i.test(tag) && !/\brel=["']stylesheet["']/i.test(tag)) continue;
      const url = /\b(?:src|href)=["']([^"']+)["']/i.exec(tag)?.[1];
      if (!url || /^(?:[a-z]+:|\/\/)/i.test(url)) continue;
      const asset = path.resolve(componentsDir, url.split(/[?#]/)[0]);
      assert.ok(fs.existsSync(asset), `${page}: missing local asset ${url}`);
      if (/^<script/i.test(tag) && asset === path.join(docsDir, 'includes', 'scripts.js')) {
        navigationScriptFound = true;
      }
    }
    if (hasSidebar) assert.ok(navigationScriptFound, `${page}: missing shared navigation script`);
  }
}

function checkNamedParts(docsDir) {
  for (const name of ['button', 'button-group', 'details']) {
    const html = fs.readFileSync(path.join(docsDir, 'components', `${name}.html`), 'utf8');
    assert.ok(html.includes(`::part(${name})`), `${name}: expected named CSS part`);
    assert.ok(!html.includes('::part(base)'), `${name}: deprecated base part`);
  }
}

test('Getting Started matches declared peers and documents Angular 20 forms setup', () => {
  const html = fs.readFileSync(path.join(__dirname, 'getting-started.html'), 'utf8');
  const pkg = require('../package.json');
  for (const name of ['@angular/core', '@angular/common', '@angular/forms']) {
    const range = pkg.peerDependencies[name].replaceAll('>', '&gt;');
    assert.ok(html.includes(`<code>${name}</code> ${range}`), `${name}: stale peer range`);
  }
  assert.ok(html.includes('^20.19.0 || ^22.12.0 || ^24.0.0'));
  assert.ok(!html.includes('Node.js 16 or later'));
  assert.ok(!html.includes('All components support Angular template-driven forms'));
  assert.ok(html.includes('imports: [FormsModule, WaInputDirective]'));
  assert.ok(html.includes('[(ngModel)]="name"'));
});

test('committed component pages resolve local styles and navigation scripts', () => {
  checkComponentAssets(__dirname);
  checkNamedParts(__dirname);
});

test('regenerating component pages preserves working local asset paths', () => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'angular-awesome-docs-'));
  try {
    const docsDir = path.join(temporaryRoot, 'docs');
    fs.mkdirSync(docsDir);
    fs.cpSync(path.join(__dirname, 'includes'), path.join(docsDir, 'includes'), { recursive: true });
    fs.cpSync(path.join(__dirname, '..', 'src', 'directives'), path.join(temporaryRoot, 'src', 'directives'), { recursive: true });
    fs.copyFileSync(path.join(__dirname, 'generate-docs.js'), path.join(docsDir, 'generate-docs.js'));
    execFileSync(process.execPath, [path.join(docsDir, 'generate-docs.js')], {
      env: { ...process.env, NODE_PATH: path.join(__dirname, '..', 'node_modules') },
      stdio: 'pipe'
    });
    checkComponentAssets(docsDir);
    checkNamedParts(docsDir);
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});
