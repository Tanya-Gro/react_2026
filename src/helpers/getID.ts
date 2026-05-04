export function getID(url: string): string {
  return url.split('/').at(-2);
}