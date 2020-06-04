console.log(' JS Running...');

var espress = require('express');
var app = espress();

app.get('/', function (req, res) {
  res.send('API Running...');
});

app.listen(3000, function () {
  console.log('API Started!');
});
