const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

const homepage = packageJson.homepage || '/';

// Write to .env file
fs.appendFileSync(path.join(__dirname, '.env'), `REACT_APP_HOMEPAGE=${homepage}\n`);