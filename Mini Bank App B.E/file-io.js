import * as fs from 'fs';

export function readFromJsonUserFile() {
  const resultEncoded = fs.readFileSync('./users.json', 'utf-8');
  const stringifiedJSON = resultEncoded.toString();
  return JSON.parse(stringifiedJSON);
}

export function writeToJsonUserFile(users) {
  fs.writeFileSync('./users.json', JSON.stringify(users));
}
