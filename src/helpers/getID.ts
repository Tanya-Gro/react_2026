export const getID = (url: string): string => {
  const parts: string[] = url.split('/').filter(Boolean);
  return parts.at(-1) ?? '';
};
