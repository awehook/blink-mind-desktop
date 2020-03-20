import fs from 'fs-extra';
export function isDir(dirPath: string) {
  try {
    return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
  } catch (_) {
    return false;
  }
}
