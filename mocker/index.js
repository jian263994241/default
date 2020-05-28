const delay = require('mocker-api/lib/delay');
const mocks = require('./mocks');

const useMock = process.env.SERVICE_ENV === 'mock';

module.exports = useMock ? delay(mocks, 1000) : {};
