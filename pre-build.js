const path = require('path');
const colors = require('colors/safe');
const fs = require('fs-extra');
const npmRun = require('package-script');
const dada = require.resolve('./package.json');
const appVersion = require('./package.json').version;

const versionFilePath = path.join(__dirname + '/src/environments/version.ts');
const getOperation = process.argv[2].replace('operation:', '');

console.log(colors.cyan('\nRunning pre-build tasks'), getOperation);

const src = `export const version = '${appVersion}';\nexport const appOperation = '${getOperation}';  
`;
console.log(colors.green(`Dada ${colors.yellow(dada)}`));

generateVersionPrint()
  .then(res => {
    console.log(colors.cyan('\nversion sucesfuly generated: ', appVersion));
    return repalceFile();
  })
  .then(res => {
    console.log(colors.cyan('\nsucesfull file switch'));
    if (getOperation.indexOf('deploy') !== -1) {
    } else {
      return getOperation === 'serve' ? runNpmAppServe() : runNpmAppBuild();
    }
  })
  .then(res => {
    console.log(colors.cyan('\nprebuild finish'));
  })
  .catch(err => {
    console.log(colors.red('\nerro em pre-build: ', err));
  });

function generateVersionPrint() {
  return new Promise((resolve, reject) => {
    console.log(colors.cyan('generating version'));
    fs.writeFile(versionFilePath, src, { flat: 'w' }, function(err) {
      if (err) {
        reject(colors.bold(err));
      }
      console.log(
        colors.green(`Updating application version         
    ${colors.yellow(appVersion)}`),
      );
      console.log(
        `${colors.green('Writing version module to')}${colors.yellow(
          versionFilePath,
        )}\n`,
      );
      resolve();
    });
  });
}

function repalceFile() {
  return new Promise((resolve, reject) => {
    resolve();

    const promises = [
      // fs.copy(
      //   `preBuild/ts/app.module_${getClient}.ts`,
      //   `src/app/app.module.ts`,
      // ),
    ];

    Promise.all(promises)
      .then(res => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

function runNpmAppBuild() {
  return new Promise((resolve, reject) => {
    // npmRum.
    console.log(colors.cyan('\nrun build', getOperation));
    npmRun.spawn(
      [
        {
          command: 'npm run build',
          // command: '/usr/bin/npm run',
          args: [],
        },
      ],
      {
        log: true,
      },
      function(params) {
        console.log(colors.cyan('finish npm script '));
      },
    );
  });
}

function runNpmAppServe() {
  return new Promise((resolve, reject) => {
    console.log(colors.cyan('\nrun serve'));
    npmRun.spawn(
      [
        {
          command: 'npm run start',
          args: [],
        },
      ],
      {
        log: true,
      },
      function(params) {
        console.log('finish npm script ', params);
      },
    );
  });
}
