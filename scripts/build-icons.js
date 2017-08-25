import path from 'path';
import fs from 'fs-extra';
import React from 'react';
import ReactDom from 'react-dom/server';

function getFiles() {
  const iconDirPath = path.resolve(__dirname, '../src/client/icons');

  return new Promise((resolve, reject) => {
    fs.readdir(iconDirPath, (err, files) => {
      if (err) {
        reject(err);
      }

      // Filter the files for actual jsx files which contain an Icon
      // and slice off the extension
      resolve(
        files
          .filter(fileName => fileName.endsWith('.jsx'))
          .map(fileName => fileName.slice(0, fileName.length - 4))
      );
    })
  });
}

async function build() {
  const files = await getFiles();

  // Ensure that the output dir exists
  fs.ensureDirSync('../src/assets/images/icons');

  // Remove all the contents from the output dir
  fs.emptyDirSync('../src/assets/images/icons');

  files.forEach((fileName) => {
    // Get the compiled image version
    const Icon = require(path.join('../.temp-icons', `${fileName}.js`));

    // Write the file to the assets location
    // We render the icon to a string and add xmlns to the root so that it get's displayed correctly
    fs.writeFileSync(
      path.join('./src/assets/images/icons', `${fileName}.svg`),
      ReactDom.renderToString(React.createElement(Icon.default, { xmlns: 'http://www.w3.org/2000/svg' })),
    );
  });
}

build();


