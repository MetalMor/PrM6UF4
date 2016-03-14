var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user:name', function(req, res) {
    res.send(req.param.name)
    //res.render('user', {user: req.param.name});
});

module.exports = router;
