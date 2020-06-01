const fs = require('fs');
const path = require('path');
const api = require('../src/config/api');

const mocks = {};
const defaultMethod = 'POST';
const create = (file) => {
  const name = path.basename(file, '.json');

  mocks[`${api[name].method || defaultMethod} ${api[name].url}`] = (
    req,
    res,
  ) => {
    const data = require('./data/' + file);
    return res.json({
      errorMsg: 'mock api',
      resultCode: '0000',
      ...data,
    });
  };
};

fs.readdirSync(path.join(__dirname, './data')).forEach(create);

module.exports = mocks;
