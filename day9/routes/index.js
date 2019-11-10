var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Board Infinity',
    name: req.query.name
  });
});

module.exports = router;
