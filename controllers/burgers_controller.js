var express = require('express');

var burger = require('../models/burger.js');

var router = express.Router();

router.get('/', function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function (req, res) {
  burger.insertOne(['burger_name'], [req.body.burger_name], function (result) {
    res.json({ id: result.insertID });
  });
});

router.put('/api/burgers/:id', function (req, res) {
  burger.updateOne(
    { devoured: req.body.devoured },
    `id = ${req.params.id}`,
    function (result) {
      res.json({ id: req.params.id });
    }
  );
});

router.delete('/api/burgers/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;

  burger.delete(condition, function (result) {
    // if (result.affectedRows == 0) {
    //   res.json({ id: req.params.id });
    // }
    res.end();
  });
});

module.exports = router;
