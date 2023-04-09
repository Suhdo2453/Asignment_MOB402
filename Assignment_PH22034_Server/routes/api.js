var express = require('express');
var router = express.Router();
var product_api = require('../controllers/api/products.api');
var user_api = require('../controllers/api/user.api');
var mdw = require('../middlewares/api.auth');
var multer = require('multer');
var upload = multer({dest: './tmp'});

// GET: /api/products
router.get('/products',mdw.api_auth, product_api.getList);
router.get('/products/:id',mdw.api_auth, product_api.getOne);

router.post('/login', user_api.login);
router.post('/reg',upload.single('image'), user_api.reg);

router.get('/profile',mdw.api_auth ,user_api.profile); // lấy thông tin user
router.get('/logout',mdw.api_auth, user_api.logout); // đăng xuất

//router.post('/users', user_api.add);

//router.put('/users/:id', user_api.edit);

//router.delete('/users', user_api.delete);

module.exports = router;