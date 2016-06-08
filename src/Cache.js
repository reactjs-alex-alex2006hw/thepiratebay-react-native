import PouchDB from 'pouchdb';


const pouchDb = new PouchDB('store');

export default function Cache() {}

export function clear() {
  return pouchDb.destroy();
}

export function add(url, parsedWebpage) {
  return pouchDb.put({
    _id: url,
    html: parsedWebpage,
    timestamp: Date.now()
  });
}

export function isCacheExpired(timestamp, minutesToExpire = 60) {
  const difference = Math.floor(Date.now() - timestamp);

  // Convert difference to minutes
  const minutesDifference = Math.floor(difference / 1000 / 60);

  return minutesDifference > minutesToExpire;
}

export function find(url) {
  return pouchDb.get(url);
}
