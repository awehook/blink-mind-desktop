const { startMain, startElectron } = require('./util');
const { startRenderer } = require('./util-renderer');

function init() {
  Promise.all([
    // startRenderer(),
    startMain()
  ])
    .then(() => {
      startElectron();
    })
    .then(() => {
      startRenderer();
    })
    .catch(err => {
      console.error(err);
    });
}

init();
