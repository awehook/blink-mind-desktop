const { startElectron, startMain } = require('./util');

function init() {
  Promise.all([startMain()])
    .then(() => {
      startElectron();
    })
    .catch(err => {
      console.error(err);
    });
}

init();
