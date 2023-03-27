var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/products.controller');

router.get('/', productCtrl.getList);

module.exports = router;