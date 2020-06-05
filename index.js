console.log(' JS Running...');

var express = require('express');
var fs = require('fs').promises;
var app = express();
var accountsRouter = require('./routes/accounts.js');

global.fileName = 'accounts.json';

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
    console.log('API Started!');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    fs.writeFile(fileName, JSON.stringify(initialJson)).catch((err) => {
      console.log(err);
    });
  }
});
