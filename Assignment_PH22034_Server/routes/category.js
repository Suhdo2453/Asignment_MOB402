var express = require('express');
var router = express.Router();
var categoryCtrl = require('../controllers/category.controller');

router.get('/', categoryCtrl.getList);
router.post('/edit/:id', categoryCtrl.editProduct);
router.get('/edit/:id', categoryCtrl.getProduct);
router.post('/create', categoryCtrl.create);
router.delete('/delete/:id', categoryCtrl.delete);
router.get('/search', categoryCtrl.searchCategory);

module.exports = router;