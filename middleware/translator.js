const path = require('path');
const i18n = require('i18n-express');

const options = {
  translationsPath: path.join(__dirname, '../translations'),
  siteLangs: ['en', 'ar'],
  defaultLang: ['ar'],
  paramLangName: 'lang', // as query param sent in request
  textsVarName: 'trans', // the property that will hold translated object
};
exports.translatorMiddleware = i18n(options);
