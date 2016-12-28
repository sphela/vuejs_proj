'use strict';

const buildExternalHelpers = require('babel-core').buildExternalHelpers;
require('babel-register');
global.babelHelpers = eval(buildExternalHelpers(null, 'var')); // eslint-disable-line no-eval
require('./main');

