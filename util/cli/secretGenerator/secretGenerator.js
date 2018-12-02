/**
 * This file is to generate secret Key which your app will use to verfiy signture or encrypt data.
 * your .env file should has APP_SECRET='key' to replace it with this function below
 * just run node util/cli/secretGenerator/secretGenerator.js
 */

const fs = require('fs');
const path = require('path');
const randomString = require('randomatic');
const logger = require('npmlog');

const randomKey = randomString('a0', 64);
const key = Buffer.from(randomKey).toString('base64');
logger.info('Key is:', key);

const file = path.resolve(process.cwd(), '.env');
fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    return logger.error('Error', err);
  }

  const textToFindKeyLine = 'APP_SECRET=';
  const newLine = '\n';
  const subStringArray = data.split(newLine);

  const newSubStringArray = subStringArray.map((line) => {
    if (line.includes('APP_SECRET=')) {
      let subStringKeyLine = line.split(textToFindKeyLine);
      subStringKeyLine[1] = key;
      subStringKeyLine = subStringKeyLine.join(textToFindKeyLine);
      return subStringKeyLine;
    }
    return line;
  });


  const result = newSubStringArray.join(newLine);
  logger.info('done');

  return fs.writeFile(file, result, 'utf8', (error) => {
    if (error) return logger.error('Error', error);
    return true;
  });
});
