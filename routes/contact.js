var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Deep Patel/Portfolio' });
});

module.exports = router;
