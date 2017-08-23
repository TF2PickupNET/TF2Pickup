const merge = require('lodash.merge');
const common = require('./webpack.common');

module.exports = merge(common, { devtool: 'inline-source-map' });
