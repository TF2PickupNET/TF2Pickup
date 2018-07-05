// @flow strict-local

import path from 'path';
import shell from 'shelljs';

type Options = {
  silent?: boolean,
  errorCallback: () => void,
};

function getCommand() {
  const flowCopySource = path.join(__dirname, '../node_modules/.bin/flow-copy-source');
  const args = [
    './src',
    './lib',
  ];

  return `${flowCopySource} ${args.join(' ')}`;
}

function handleExit(code, errorCallback) {
  if (code !== 0) {
    if (errorCallback && typeof errorCallback === 'function') {
      errorCallback();
    }

    shell.exit(code);
  }
}

export default function buildFlow(options: Options) {
  const {
    silent = true,
    errorCallback,
  } = options;

  const command = getCommand();
  const { code } = shell.exec(command, { silent });

  handleExit(code, errorCallback);
}
