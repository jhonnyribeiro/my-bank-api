console.log(' JS Running...');

var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('API Running...');
});

app.post('/account', (req, res) => {
  let params = req.body;

  //   fs.writeFile('accounts.json', JSON.stringify(params), (err) => {
  //     console.log(err);
  //   });

  fs.readFile('accounts.json', 'utf8', (err, data) => {
    console.log(err);

    fs.readFile('accounts.json', 'utf8', (err, data) => {
      console.log(err);
      try {
        let json = JSON.parse(data);
        console.log(json);
        res.send('Post Account');
      } catch (error) {
        res.send(error);
      }
    });
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
          console.log(err);
        });
      }
      console.log(err);
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }

  console.log('API Started!');
});
