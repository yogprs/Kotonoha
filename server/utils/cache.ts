import type { StorageValue } from "unstorage";

export const getCache = async <T extends StorageValue>(
  key: string
): Promise<T | null> => {
  const storage = useStorage("cache");
  return (await storage.getItem(key)) as T | null;
};

export const setCache = async <T extends StorageValue>(
  key: string,
  value: T,
  ttlSeconds: number
): Promise<void> => {
  const storage = useStorage("cache");
  await storage.setItem(key, value, { ttl: ttlSeconds });
};

export const cacheTTL = 60 * 60 * 2 // 2 jam;