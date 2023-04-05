var myModel = require('../models/user.model')

exports.getList = (req, res, next)=>{
    res.render('home/index', {title: 'Dashboard'});
}

exports.login= async (req, res, next)=>{
    let msg = '';

    if(req.method == 'POST'){

        try {
            let obj = await myModel.userModel.findOne({username:req.body.username});
            console.log(obj);

            if(obj != null){
                if(obj.passwd == req.body.passwd){
                    if(obj.role == 1){
                        req.session.userLogin = obj;
                        return res.redirect('/');
                    }else{
                        msg = 'Tài khoản không có quyền truy cập';
                    }
                }else{
                    msg = 'Username hoặc password không đúng!';
                }
            }else{
                msg = 'Tài khoản không tồn tại';
            }
        } catch (error) {
            msg = error.message;
            console.log(error);
        }
    }

    res.render('home/login', {msg});
}

exports.register=(req, res, next)=>{
    res.render('home/register');
}