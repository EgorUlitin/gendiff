import * as fs from 'fs';
import * as path from 'path';

export const getObj = filepath => {
  const file = fs.readFileSync(filepath, 'utf8')
  return JSON.parse(file)
}

export const getFilePath = filepath => {
  const fPath = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath)
  return fPath
}