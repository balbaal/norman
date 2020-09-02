var express = require('express');
var router = express.Router();

/* GET payments listing. */
router.get('/', function(req, res, next) {
  res.send(`Payments Service`);
});

module.exports = router;
