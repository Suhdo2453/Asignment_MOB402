var express = require('express');
var multer = require('multer');
var router = express.Router();
var accountsCtrl = require('../controllers/accounts.controller');
var middleware = require('../middlewares/checkLogin');

const upload = multer({dest: './tmp'});

router.use(middleware.LoginRequired);

/* GET users listing. */
router.get('/',accountsCtrl.getList);
router.get('/edit/:id', accountsCtrl.getAccount);
router.post('/edit/:id',upload.single('image'), accountsCtrl.editAccount);
router.post('/create',upload.single('image'), accountsCtrl.create);
router.delete('/delete/:id', accountsCtrl.deleteAccount);

module.exports = router;
