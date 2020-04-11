import elog from 'electron-log';
import { app } from 'electron';
import { ProductName } from '../../common';
import { initStore } from '../store';
import { i18n } from '../i18n';
import { createWindowMgr, windowMgr } from '../window/window-manager';
import { isDir, isWindows } from '../utils';
import { Cli } from '../cli';
const log = require('debug')('main:app');

export class App {
  constructor(cli: Cli) {
    this.cli = cli;
    this.filesToOpen = this.cli.filesToOpen;
  }
  cli: Cli;
  filesToOpen: string[] = [];

  init() {
    // log('app on ready');
    app.on('ready', this.onReady);

    app.on('second-instance', (event, argv, workingDirectory) => {
      elog.log('second-instance', argv, 'workingDirectory:', workingDirectory);
      const { filesToOpen } = this.cli.parseArgs(argv.slice(1));
      this.openFilesToOpen(filesToOpen);
    });

    app.on('open-file', (event, pathname) => {
      elog.log('open-file', pathname);
      log('open-file', pathname);
      if (isDir(pathname)) return;
      if (app.isReady()) {
        this.openFilesToOpen([pathname]);
      } else {
        this.filesToOpen = [pathname];
      }
    });

    app.on('window-all-closed', () => {
      app.exit();
    });

    if (!isWindows) {
      app.on('before-quit', () => {
        windowMgr.destroyWelcomeWindow();
      });

      app.setAboutPanelOptions({
        applicationName: 'BlinkMind(Insider Preview)'
      });
    }

    app.on('activate', () => {
      log('activate');
      if (windowMgr.getOpenedFileWindows().size === 0) {
        windowMgr.showWelcomeWindow();
      }
    });
  }

  openFilesToOpen(filesToOpen) {
    windowMgr.openFilesToOpen(filesToOpen.slice());
  }

  onReady = () => {
    log('appReadyCallback');
    app.name = ProductName;
    initStore();
    i18n.init();
    require('../sentry');
    createWindowMgr(this.filesToOpen.slice());
    this.filesToOpen = [];
  };
}
