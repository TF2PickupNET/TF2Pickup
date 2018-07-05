// @flow strict-local

import path from 'path';
import shell from 'shelljs';
import chalk from 'chalk';
import log from 'npmlog';

import buildLib from './build-lib';
import buildFlow from './build-flow';

const packagePath = path.join(path.resolve('./'), 'package.json');
// $FlowFixMe: Flow doesn't allow computed requires
const packageJson = require(packagePath); // eslint-disable-line import/no-dynamic-require

function removeLib() {
  shell.rm('-rf', 'lib/');
}

function logError(type) {
  log.error(`FAILED to ${type}: ${chalk.bold(`${packageJson.name}@${packageJson.version}`)}`);
}

removeLib();
buildLib({ errorCallback: () => logError('build commonjs') });
buildFlow({ errorCallback: () => logError('build flow files') });

log.info(chalk.gray(`Built: ${chalk.bold(`${packageJson.name}@${packageJson.version}`)}`));
