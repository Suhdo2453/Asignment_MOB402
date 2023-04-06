var express = require('express');
var multer = require('multer');
var router = express.Router();
var productCtrl = require('../controllers/products.controller');
var middleware = require('../middlewares/checkLogin');

var upload = multer({dest: './public/upload'});

router.use(middleware.LoginRequired);

router.get('/', productCtrl.getList);
router.post('/edit/:id',upload.single('imageEdit'), productCtrl.editProduct);
router.get('/edit/:id', productCtrl.getProduct);
router.post('/create',upload.single('image'), productCtrl.create);
router.delete('/delete/:id', productCtrl.delete);
router.get('/detail', productCtrl.detail);

module.exports = router;