var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user.controller.server');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', userCtrl.createUser);

module.exports = router;