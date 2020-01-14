const program = require('commander');
const readline = require('readline');
const fs = require('fs-extra');
const path = require('path');
const package = require('../package.json');

program.option('-u, --upgrade', 'upgrade blink-mind version');
program.option('--link', 'link blink-mind');
program.option('--unlink', 'unlink blink-mind');

program.parse(process.argv);

if (program.upgrade) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('please input the blink-mind version:', function(answer) {
    console.log('blink-mind version:' + answer);
    for (let dep in package.dependencies) {
      if (dep.startsWith('@blink-mind/')) package.dependencies[dep] = answer;
    }
    fs.writeJSONSync(path.resolve(__dirname, '../package.json'), package, {
      spaces: '\t'
    });
    rl.close();
  });
}

function getAllBlinkPackages(package) {
  const res = [];
  for (let dep in package.dependencies) {
    if (dep.startsWith('@blink-mind/')) {
      res.push(dep);
    }
  }
  return res;
}

if (program.link) {
  console.log('link blink-mind packages');
  const { exec } = require('child_process');
  exec(
    `yarn link ${getAllBlinkPackages(package).join(' ')}`,
    (err, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      if (err !== null) {
        console.error(`exec error: ${err}`);
      }
    }
  );
}

if (program.unlink) {
  console.log('link blink-mind packages');
  const { exec } = require('child_process');
  exec(
    `yarn unlink ${getAllBlinkPackages(package).join(' ')}`,
    (err, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      stderr && console.error(`stderr: ${stderr}`);
      err && console.error(`exec error: ${err}`);
    }
  );
}
