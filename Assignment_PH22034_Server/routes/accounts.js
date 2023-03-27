var express = require('express');
var router = express.Router();
var accountsCtrl = require('../controllers/accounts.controller');

/* GET users listing. */
router.get('/',accountsCtrl.getList);

module.exports = router;
