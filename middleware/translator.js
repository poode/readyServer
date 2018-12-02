const path = require('path');
const i18n = require('i18n-express');

const options = {
  translationsPath: path.join(__dirname, '../translations'),
  siteLangs: ['en', 'ar'],
  defaultLang: ['ar'],
  textsVarName: 'trans',
};
exports.translatorMiddleware = i18n(options);
