export function* generateId(startId = 0) {
  while (true) {
    startId++;
    yield startId;
  }
}
