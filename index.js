console.log(' JS Running...');

var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('API Running...');
});

app.post('/account', (req, res) => {
  let account = req.body;
  fs.readFile('accounts.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextId, ...account };
        json.nextId++;
        json.accounts.push(account);

        fs.writeFile('accounts.json', JSON.stringify(json), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.end();
          }
        });
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    } else {
      res.status(400).send({ error: err.message });
    }
  });

  //   fs.appendFile('accounts.json', JSON.stringify(params), (err) => {
  //     console.log(err);
  //   });
});

app.listen(3000, function () {
  try {
    fs.readFile('accounts.json', 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile('accounts.json', JSON.stringify(initialJson), (err) => {
          res.status(400).send({ error: err.message });
        });
      }
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  console.log('API Started!');
});
