var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextId, ...account };
        json.nextId++;
        json.accounts.push(account);

        fs.writeFile(fileName, JSON.stringify(json), (err) => {
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

  //   fs.appendFile(fileName, JSON.stringify(params), (err) => {
  //     console.log(err);
  //   });
});

router.get('/', (_, res) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (!err) {
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

module.exports = router;
