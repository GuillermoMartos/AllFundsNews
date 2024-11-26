import { ModelNew, UserData } from './types';

const oneHourMSCache = 3600000;
const threeHoursMSCache = 10800000;
const userCache = new Map<string, UserData>();
const newsCache = new Map<string, any>();

export function addUserToCache(userId: string, userData: UserData) {
  userCache.set(userId, userData);
}
export function addNewToCache(newId: string, newData: ModelNew) {
  newsCache.set(newId, newData);
}

export function getUserFromCache(userId: string) {
  const entry = userCache.get(userId);
  return entry;
}
export function getNewFromCache(newId: string) {
  const entry = newsCache.get(newId);
  return entry;
}

export function deleteNewFromCache(newId: string) {
  const entry = newsCache.delete(newId);
  return entry;
}

function clearCache(cache: Map<any, any>, name: string) {
  console.log(
    `[${name} CACHE CLEARING] Clearing cache at ${new Date().toISOString()}`,
  );
  cache.clear();
}

setInterval(() => clearCache(newsCache, 'NEWS'), oneHourMSCache);
setInterval(() => clearCache(userCache, 'USER'), threeHoursMSCache);
