const bcrypt = require("bcrypt");
const model = require("../../models/user.model");
const fs = require('fs');

exports.login = async (req, res, next) => {
    try {
        const user = await model.userModel
                    .findByCredentials(req.body.username, req.body.passwd);
        if (!user) {
            return res.status(401)
                    .json({error: 'Sai thông tin đăng nhập'});
        }
        // đăng nhập thành công, tạo token làm việc mới
        await user.generateAuthToken();

        return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error.message});
    }
}

exports.reg = async (req, res, next)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt, req.body);
        const user = new model.userModel(req.body);

        user.passwd = await bcrypt.hash(req.body.passwd, salt);
        user.role = 0;
 
        user.token = await user.generateAuthToken();
        console.log(req.file);
        // lưu ảnh và tạo đường dẫn ảnh nếu có
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
                user.image = '/upload/' + req.file.originalname;
            }
        } catch (error) {
            console.log(error);
        }

        let new_u = await user.save()

        return res.status(201).json({ user: new_u })

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error.message})
    }
}

exports.profile = (req, res, next)=>{
    res.send(req.user);

   // res.json( {status: 1, msg: 'Trang thông tin'});
}

exports.editProfile = async (req, res, next)=>{
    try {
        const user = await model.userModel.findOne({token: req.body.token});
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
                user.image = '/upload/' + req.file.originalname;
            }
        } catch (error) {
            console.log(error);
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        const updatedUser = await user.save();
        res.send(updatedUser);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
      }
}

exports.logout = async (req, res, next)=>{
    try {
        console.log( req.user);
        // req.user.generateAuthToken();
        req.user.token = null; //xóa token
        await req.user.save()
        return res.status(200).json({msg: 'Đăng xuất thành công'});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
//    res.json( {status: 1, msg: 'Trang đăng xuất'});
}

exports.test = async (req, res, next)=>{
    res.status(200).json({msg: 'thanh cong'});
}