require('electron-debug')({ showDevTools: false });

// Install `react-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer');
  installExtension
    .default(installExtension.REACT_DEVELOPER_TOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `react-devtools`: \n', err);
    });
});

require('./index');
