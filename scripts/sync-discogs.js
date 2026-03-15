const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

const TOKEN = process.env.DISCOGS_TOKEN;
const USERNAME = 'oh-kay';
const PER_PAGE = 100;
const OUTPUT = path.join(__dirname, '..', 'src', 'records.json');

if (!TOKEN) {
  console.error('Missing DISCOGS_TOKEN in .env');
  process.exit(1);
}

function fetchPage(page) {
  return new Promise((resolve, reject) => {
    const url = `https://api.discogs.com/users/${USERNAME}/collection/folders/0/releases?page=${page}&per_page=${PER_PAGE}&token=${TOKEN}`;
    https.get(url, { headers: { 'User-Agent': 'VinylApp/1.0' } }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          return;
        }
        resolve(JSON.parse(body));
      });
    }).on('error', reject);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripDisambiguation(name) {
  return name.replace(/\s*\(\d+\)$/, '');
}

function extractSpeed(descriptions) {
  if (!descriptions) return '';
  for (const d of descriptions) {
    if (d.includes('45 RPM')) return '45';
    if (d.includes('33 RPM')) return '33';
  }
  return '';
}

function transformRelease(release) {
  const info = release.basic_information;
  const format = info.formats && info.formats[0];
  const genres = [...(info.genres || []), ...(info.styles || [])];

  return {
    id: String(info.id),
    artist: stripDisambiguation(info.artists[0].name),
    album: info.title,
    genre: genres.join(', '),
    year: String(info.year),
    discs: format ? format.qty : '',
    speed: format ? extractSpeed(format.descriptions) : '',
    bought: release.date_added ? release.date_added.substring(0, 4) : '',
    date_added: release.date_added || '',
    thumb: info.thumb || '',
    cover_image: info.cover_image || '',
  };
}

async function main() {
  console.log('Fetching Discogs collection...');

  const firstPage = await fetchPage(1);
  const totalPages = firstPage.pagination.pages;
  const totalItems = firstPage.pagination.items;
  console.log(`Found ${totalItems} records across ${totalPages} pages`);

  let allReleases = [...firstPage.releases];
  console.log(`Page 1/${totalPages} (${firstPage.releases.length} records)`);

  for (let page = 2; page <= totalPages; page++) {
    await delay(1000);
    const data = await fetchPage(page);
    allReleases = allReleases.concat(data.releases);
    console.log(`Page ${page}/${totalPages} (${data.releases.length} records)`);
  }

  const records = allReleases.map(transformRelease);
  fs.writeFileSync(OUTPUT, JSON.stringify(records, null, 2) + '\n');
  console.log(`Successfully wrote ${records.length} records to ${OUTPUT}`);
}

main().catch((err) => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
