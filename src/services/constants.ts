export const FETCH_TIMEOUT_MS = 10_000;

const DEFAULT_TTL = 60;

export const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL ?? DEFAULT_TTL);
