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

  fs.writeFile('accounts.json', JSON.stringify(params), (err) => {
    console.log(err);
  });

  res.send('Post Account');
  console.log('Post Account');
});

app.listen(3000, function () {
  console.log('API Started!');
});
