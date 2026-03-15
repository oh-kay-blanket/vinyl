const fs = require('fs');
const path = require('path');

// --- Helpers ---

function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,'"()\-\/:!?&]/g, '')  // remove punctuation
    .replace(/\s+/g, ' ');              // collapse multiple spaces to one
}

function makeKey(artist, album) {
  return normalize(artist) + '|||' + normalize(album);
}

function parseTSV(text) {
  const lines = text.trim().split('\n');
  const header = lines[0].split('\t');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const row = {};
    header.forEach((h, idx) => {
      row[h.trim()] = (cols[idx] || '').trim();
    });
    rows.push(row);
  }
  return rows;
}

function escapeCSV(val) {
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// --- Main ---

const oldPath = '/Users/plunketk/projects/vinyl/old-set.csv';
const discogsPath = '/Users/plunketk/projects/vinyl/src/records.json';
const outputPath = '/Users/plunketk/projects/vinyl/missing-from-discogs.csv';

// 1. Read old CSV (TSV)
const oldText = fs.readFileSync(oldPath, 'utf-8');
const oldRecords = parseTSV(oldText);

// 2. Read Discogs JSON
const discogsData = JSON.parse(fs.readFileSync(discogsPath, 'utf-8'));

// 3. Build a Set of normalized keys from Discogs data
const discogsKeys = new Set();
for (const rec of discogsData) {
  discogsKeys.add(makeKey(rec.artist, rec.album));
}

// 4. Find old records missing from Discogs
const missing = [];
for (const rec of oldRecords) {
  const key = makeKey(rec.artist, rec.album);
  if (!discogsKeys.has(key)) {
    missing.push(rec);
  }
}

// 5. Write missing records CSV
const csvHeader = 'id,artist,album,genre,year';
const csvLines = [csvHeader];
for (const rec of missing) {
  csvLines.push([
    escapeCSV(rec.id),
    escapeCSV(rec.artist),
    escapeCSV(rec.album),
    escapeCSV(rec.genre),
    escapeCSV(rec.year),
  ].join(','));
}
fs.writeFileSync(outputPath, csvLines.join('\n') + '\n', 'utf-8');

// 6. Print summary
console.log('=== Comparison Summary ===');
console.log(`Total old records:        ${oldRecords.length}`);
console.log(`Total Discogs records:    ${discogsData.length}`);
console.log(`Missing from Discogs:     ${missing.length}`);
console.log('');

if (missing.length > 0) {
  console.log('Missing records:');
  for (const rec of missing) {
    console.log(`  ${rec.artist} - ${rec.album}`);
  }
} else {
  console.log('All old records have a match in Discogs!');
}

console.log('');
console.log(`Output written to: ${outputPath}`);
