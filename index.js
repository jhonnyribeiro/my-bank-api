console.log(' JS Running...');

const express = require('express');
const fs = require('fs').promises;
const app = express();
const accountsRouter = require('./routes/accounts.js');
const winston = require('winston');

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
// prettier-ignore
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.console)(),
    new (winston.transports.file)({filename: "my-bank-api.log"})
  ],
  format: combine()
});

app.use(express.json());
app.use('/account', accountsRouter);

app.get('/', function (req, res) {
  res.send('API Running...');
});

app.listen(3000, async () => {
  try {
    /*fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile(fileName, JSON.stringify(initialJson), (err) => {
          res.status(400).send({ error: err.message });
        });
      }
      if (err) {
        console.log(err);
      }
      console.log(data);
    });*/

    await fs.readFile(fileName, 'utf8');
    logger.info('API Started!');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    fs.writeFile(fileName, JSON.stringify(initialJson)).catch((err) => {
      logger.error(err);
    });
  }
});
