import elog from 'electron-log';
export class Cli {
  argv: string[];
  filesToOpen: string[];
  constructor() {
    elog.log('process.argv', process.argv);
    this.filesToOpen = [];
    this.argv = process.argv.slice(1);
    this.parseArgs();
  }

  parseArgs() {
    for (let arg of this.argv) {
      if (!arg.startsWith('-') && !arg.startsWith('--')) {
        this.filesToOpen.push(arg);
      }
    }
  }
}
