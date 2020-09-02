var express = require('express');
var router = express.Router();

/* GET members listing. */
router.get('/', function(req, res, next) {
  res.send(`Members Service`);
});

module.exports = router;
