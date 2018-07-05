// @flow strict-local

import path from 'path';
import shell from 'shelljs';

type Options = {
  silent?: boolean,
  errorCallback: () => void,
};

function getCommand() {
  const babel = path.join(__dirname, '../node_modules/.bin/babel');
  const args = [
    './src',
    '--out-dir ./lib',
    '--config-file "../../babel.config.js"',
  ];

  return `${babel} ${args.join(' ')}`;
}

function handleExit(code, errorCallback) {
  if (code !== 0) {
    if (errorCallback && typeof errorCallback === 'function') {
      errorCallback();
    }

    shell.exit(code);
  }
}

export default function buildLib(options: Options) {
  const {
    silent = true,
    errorCallback,
  } = options;

  const command = getCommand();
  const { code } = shell.exec(command, { silent });

  handleExit(code, errorCallback);
}
