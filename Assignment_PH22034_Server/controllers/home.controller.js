var myModel = require('../models/user.model')

exports.getList = (req, res, next)=>{
    res.render('home/index', {title: 'Dashboard'});
}

exports.login= async (req, res, next)=>{
    let msg = '';

    if(req.method == 'POST'){

        try {
            let obj = await myModel.userModel.findByCredentials(req.body.username, req.body.passwd);
            console.log(obj);

            if(obj){
                if(obj.role == 1){
                    req.session.userLogin = obj;
                    return res.redirect('/');
                }else{
                    msg = 'Tài khoản không có quyền truy cập';
                }
            }else{
                msg = 'Username hoặc mật khẩu không đúng';
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