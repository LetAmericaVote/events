if (process.env.NODE_ENV === 'development') {
  const path = require('path').resolve(process.cwd(), '.env.development.local');
  require('dotenv').config({ path });
}

require('ignore-styles');

require('babel-polyfill');

require('babel-register')({
  ignore: [ /(node_modules)/ ],
  presets: ['env', 'react-app'],
  plugins: ['syntax-async-functions', 'transform-regenerator'],
});

require('./index');
