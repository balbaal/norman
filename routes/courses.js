var express = require('express');
var router = express.Router();

/* GET courses listing. */
router.get('/', function(req, res, next) {
  res.send(`Courses Service`);
});

module.exports = router;
