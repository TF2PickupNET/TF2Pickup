import path from 'path';
import fs from 'fs-extra';
import React from 'react';
import svgToPng from 'svg-to-png';
import ReactDom from 'react-dom/server';

// Ensure that the output dir exists
fs.ensureDirSync('./src/assets/images/icons');

// Remove all the contents from the output dir
fs.emptyDirSync('./src/assets/images/icons');

fs.readdirSync('./src/client/icons')
  .filter(fileName => fileName.endsWith('.jsx'))
  .map(fileName => fileName.slice(0, fileName.length - 4))
  .forEach((fileName) => {
    // Get the compiled image version
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const Icon = require(path.join('../.temp-icons', `${fileName}.js`));

    // Write the file to the assets location
    // We render the icon to a string and add xmlns to the root so that it get's displayed correctly
    fs.writeFileSync(
      path.join('./src/assets/images/icons', `${fileName}.svg`),
      ReactDom.renderToString(React.createElement(Icon.default, { xmlns: 'http://www.w3.org/2000/svg' })),
    );
  });

/**
 * This for the web app manifest.
 * Convert the logo from svg to png.
 */
async function convertLogo() {
  try {
    await svgToPng.convert(
      path.resolve(__dirname, '../src/assets/images/icons/logo.svg'),
      path.resolve(__dirname, '../src/assets/images/icons'),
      {
        defaultHeight: 128,
        defaultWidth: 128,
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}

convertLogo();
