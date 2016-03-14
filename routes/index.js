var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // envia la vista con un parametro "title"
  res.render('index', { title: 'JGFxat' });
});

module.exports = router;
