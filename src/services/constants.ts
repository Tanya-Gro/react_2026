export const FETCH_TIMEOUT_MS = 10_000;

const DEFAULT_TTL = 60;

const _parsed = Number(process.env.NEXT_PUBLIC_CACHE_TTL);

export const CACHE_TTL =
  Number.isFinite(_parsed) && _parsed >= 0 ? _parsed : DEFAULT_TTL;
