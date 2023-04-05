const db = require('../data/db');

const userSchema = new db.mongoose.Schema(
    {
        username: {type: String, required: true},
        image: {type: String, required: true},
        email: {type: String, required: true},
        passwd: {type: String, required: true},
        role: {type: Number, required: true}
    },
    {
        collection: 'users'
    }
    );

    let userModel = new db.mongoose.model('userModel', userSchema); 

    module.exports = {userModel}