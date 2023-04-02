const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Assignment')
.then(()=> console.log('Conected to database'))
.catch((err)=>{
    console.log('Failed to connect to database');
    console.log(err);
});

module.exports = {mongoose}