var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Deep Patel/Portfolio' });
});

router.get('/contacts', function(req, res, next) {
  res.render('contact', { title: 'Deep Patel/Portfolio' });
});


router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Deep Patel/Portfolio' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Deep Patel/Portfolio' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Deep Patel/Portfolio' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Deep Patel/Portfolio' });
});

module.exports = router;
