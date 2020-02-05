const platform = process.platform;
export const isMacOS = platform === 'darwin';
export const isWindows = platform === 'win32';

export function convertName(platform) {
  if (platform === 'darwin') {
    return 'macOS';
  }
  if (platform === 'win32') {
    return 'Windows';
  }
  if (platform === 'linux') {
    return 'Linux';
  }
}
