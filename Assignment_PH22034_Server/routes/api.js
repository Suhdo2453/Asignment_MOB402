var express = require('express');
var router = express.Router();
var product_api = require('../controllers/api/products.api');

// GET: /api/products
router.get('/products', product_api.getList);
router.get('/products/:id', product_api.getOne);

router.post('/login', product_api.login);
router.post('/reg', product_api.login);

//router.post('/users', user_api.add);

//router.put('/users/:id', user_api.edit);

//router.delete('/users', user_api.delete);

module.exports = router;