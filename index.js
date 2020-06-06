console.log(' JS Running...');

import express from 'express';
import { promises } from 'fs';
import winston from 'winston';

const readFile = promises.readFile;
const writeFile = promises.writeFile;

const app = express();
// const accountsRouter = require('./routes/accounts.js');
import accountsRouter from './routes/accounts.js';

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

app.use(express.json());
app.use('/account', accountsRouter);

app.get('/', function (req, res) {
  res.send('API Running...');
});

app.listen(3000, async () => {
  try {
    /*readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };
        writeFile(fileName, JSON.stringify(initialJson), (err) => {
          res.status(400).send({ error: err.message });
        });
      }
      if (err) {
        console.log(err);
      }
      console.log(data);
    });*/

    await readFile(fileName, 'utf8');
    logger.info('API Started!');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    writeFile(fileName, JSON.stringify(initialJson)).catch((err) => {
      logger.error(err);
    });
  }
});
