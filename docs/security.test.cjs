const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  });
}

function externalAssets(html) {
  return [...html.matchAll(/<(script|link)\b[^>]*>/gi)].flatMap(([tag, kind]) => {
    if (kind.toLowerCase() === 'link' && !/\brel=["']stylesheet["']/i.test(tag)) return [];
    const url = /\b(?:src|href)=["']([^"']+)["']/i.exec(tag)?.[1];
    return url && /^(?:https?:)?\/\//i.test(url) ? [{ tag, url }] : [];
  });
}

test('external documentation scripts and styles use HTTPS, SHA-384 integrity and anonymous CORS', () => {
  let checked = 0;
  const hashes = new Map();
  for (const file of htmlFiles(__dirname)) {
    for (const { tag, url } of externalAssets(fs.readFileSync(file, 'utf8'))) {
      const context = `${path.relative(__dirname, file)}: ${url}`;
      assert.ok(url.startsWith('https://'), context);
      const integrity = /\bintegrity=["'](sha384-[A-Za-z0-9+/]{64})["']/.exec(tag)?.[1];
      assert.ok(integrity, `Missing SHA-384 integrity: ${context}`);
      assert.match(tag, /\bcrossorigin=["']anonymous["']/i, context);
      if (hashes.has(url)) assert.equal(integrity, hashes.get(url), `Conflicting integrity: ${context}`);
      hashes.set(url, integrity);
      checked++;
    }
  }
  assert.ok(checked > 0, 'Expected external documentation assets to be checked');
});
