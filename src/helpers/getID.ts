export function getID(url: string): string {
  const parts = url.split('/').filter(Boolean);
  return parts.at(-1) ?? '';
}
