export function toEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  const driveFileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveFileMatch) {
    return `https://drive.google.com/file/d/${driveFileMatch[1]}/preview`;
  }

  const driveIdMatch = trimmed.match(/drive\.google\.com\/(?:open\?id=|uc\?id=|.*?[?&]id=)([^&]+)/i);
  if (driveIdMatch) {
    return `https://drive.google.com/file/d/${driveIdMatch[1]}/preview`;
  }

  const ytWatch = trimmed.match(/[?&]v=([^&]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  const ytShort = trimmed.match(/youtu\.be\/([^?&/]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  const ytEmbed = trimmed.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (ytEmbed) return `https://www.youtube.com/embed/${ytEmbed[1]}`;

  if (/drive\.google\.com\/file\/d\/[^/]+\/preview/i.test(trimmed)) {
    return trimmed;
  }

  return null;
}
