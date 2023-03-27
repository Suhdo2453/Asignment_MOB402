var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/home.controller');

/* GET home page. */
router.get('/', homeCtrl.getList);
router.get('/login', homeCtrl.login);
router.get('/register', homeCtrl.register);

module.exports = router;
