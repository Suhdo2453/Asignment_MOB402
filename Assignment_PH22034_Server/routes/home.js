var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/home.controller');
var middleware = require('../middlewares/checkLogin');


/* GET home page. */
router.get('/',middleware.LoginRequired, homeCtrl.getList);
router.get('/login', homeCtrl.login);
router.post('/login', homeCtrl.login);
router.get('/register', homeCtrl.register);

module.exports = router;
