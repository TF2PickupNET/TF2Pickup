// @flow

import fs from 'fs';
import { promisify } from 'util';

const files = new Map();
const readFileAsync = promisify(fs.readFile);

/**
 * Read a file from the fs but also cache the read file for later.
 * Only pass absolute paths and only use this function for files which don't change in the process.
 */
export default async function readFile(path: string): Promise<string> {
  const cachedContent = files.get(path);

  if (cachedContent) {
    return cachedContent;
  }

  const content = await readFileAsync(path, 'utf-8');

  files.set(path, content);

  return content;
}
