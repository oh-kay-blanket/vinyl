const cache = new Map();

function sanitize(str) {
  return str
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\s*\[.*?\]\s*/g, " ")
    .trim();
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function buildUrl(query) {
  const params = `term=${query}&media=music&entity=song&limit=10`;
  // In development, webpack-dev-server proxies /api/itunes to iTunes
  if (window.location.hostname === "localhost") {
    return `/api/itunes?${params}`;
  }
  return `https://itunes.apple.com/search?${params}`;
}

export async function fetchPreviewUrl(artist, album) {
  const key = `${artist}|||${album}`;
  if (cache.has(key)) return cache.get(key);

  const query = encodeURIComponent(`${sanitize(artist)} ${sanitize(album)}`);
  const url = buildUrl(query);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`iTunes API ${res.status}`);
    const data = await res.json();

    const normArtist = normalize(artist);
    const normAlbum = normalize(album);

    // Try to find a track matching both artist and album
    const match = data.results.find((r) => {
      const rArtist = normalize(r.artistName || "");
      const rAlbum = normalize(r.collectionName || "");
      return (
        r.previewUrl &&
        (rArtist.includes(normArtist) || normArtist.includes(rArtist)) &&
        (rAlbum.includes(normAlbum) || normAlbum.includes(rAlbum))
      );
    });

    // Fallback: match artist only
    const fallback =
      match ||
      data.results.find((r) => {
        const rArtist = normalize(r.artistName || "");
        return (
          r.previewUrl &&
          (rArtist.includes(normArtist) || normArtist.includes(rArtist))
        );
      });

    const result = fallback
      ? { previewUrl: fallback.previewUrl, trackName: fallback.trackName }
      : null;

    cache.set(key, result);
    return result;
  } catch (err) {
    console.warn("iTunes API error:", err);
    throw err;
  }
}
