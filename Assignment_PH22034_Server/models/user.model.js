const db = require('../data/db');
const sortablePlugin = require('../plugins/plugin');

const jwt = require('jsonwebtoken')  ;//  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save 
require('dotenv').config(); // su dung thu vien doc file env:   npm install dotenv --save
const secret_code = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");  // cài npm install bcrypt  --save


const userSchema = new db.mongoose.Schema(
    {
        username: {type: String, required: true},
        image: {type: String, required: false},
        email: {type: String, required: false},
        passwd: {type: String, required: true},
        role: {type: Number, required: false},
        token: {type: String, required: false}
    },
    {
        collection: 'users'
    }
    );
    
    userSchema.plugin(sortablePlugin);

    userSchema.methods.generateAuthToken = async function () {
        const user = this;
        console.log(user);
        const token = jwt.sign({_id: user._id, username: user.username}, secret_code);
        // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
        user.token = token;
        await user.save();
        return token;
    }

     // dùng cho đăng nhập: 
    userSchema.statics.findByCredentials = async (username, passwd) => {

        const user = await userModel.findOne({username});
        if (!user) {
            throw new Error('Không tồn tại user');
        }
        const isPasswordMatch = await bcrypt.compare(passwd, user.passwd);
        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
            console.log('sai pass');
            throw new Error('Sai password');
        }
        return user;
    }

    let userModel = new db.mongoose.model('userModel', userSchema); 

    module.exports = {userModel}