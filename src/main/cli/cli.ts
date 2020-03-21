import elog from 'electron-log';
export class Cli {
  argv: string[];
  filesToOpen: string[];
  constructor() {
    elog.log('process.argv', process.argv);
    this.argv = process.argv.slice(1);
    const { filesToOpen } = this.parseArgs(this.argv);
    this.filesToOpen = filesToOpen;
  }

  parseArgs(argv) {
    const filesToOpen = [];
    for (let arg of argv) {
      if (
        !arg.startsWith('-') &&
        !arg.startsWith('--') &&
        (arg.endsWith('.bmind') || arg.endsWith('.blinkmind'))
      ) {
        filesToOpen.push(arg);
      }
    }
    return { filesToOpen };
  }
}
