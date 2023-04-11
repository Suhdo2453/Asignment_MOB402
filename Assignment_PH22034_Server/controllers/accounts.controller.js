const { model } = require('mongoose');
const Model = require('../models/user.model');
const paginate = require('../ultilities/pagination');
const bcrypt = require("bcrypt");
const fs = require('fs');

exports.getList = async (req, res, next)=>{
    let itemsPerPage = 5;
    let page = parseInt(req.query.page) || 1;
    const selectedOption = req.query.role;
    let role = req.query.role||null;
    let username = req.query.username||null;

    let condition = {};

    if (role != -1 && role) {
        condition.role = role;
    }

    if (username != ''&& username) {
        condition.username = { $regex: username, $options: 'i' };
    }

    const { items, pageCount, totalItems } = await paginate(
        Model.userModel,
        condition,
        itemsPerPage,
        page,
        req
      );

    res.render('accounts/list', {title: 'Accounts', items, pageCount, selectedOption});
}

exports.create = async (req, res, next)=>{
    var salt = await bcrypt.genSalt(10);
    let obj = new Model.userModel();
    obj.username = req.body.username;
    obj.email = req.body.email;
    obj.passwd = await bcrypt.hash(req.body.passwd, salt);
    obj.role = req.body.role;
    try {
        if(req.file){
            fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
        obj.image = '/upload/' + req.file.originalname;
        }
    } catch (error) {
        console.log(error);
    }

    try {
        let new_user = await obj.save();
        console.log(new_user);
    } catch (error) {
        console.log(error);
    }

    res.redirect('/accounts');
}

exports.getAccount = async (req, res, next)=>{
    let objAcc = await Model.userModel.findById(req.params.id);
    res.render('accounts/editAcc', {objAcc});
}

exports.editAccount = async (req, res, next)=>{
    let obj = new Model.userModel();
    obj._id = req.params.id;
    obj.username = req.body.username;
    obj.email = req.body.email;
    try {
        if(req.file){
            fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
            obj.image = '/upload/' + req.file.originalname;
        }
    } catch (error) {
        console.log(error);
    }
    obj.role = req.body.role;

    try {
        await Model.userModel.findByIdAndUpdate(req.params.id, obj);
        res.redirect('/accounts');
    } catch (error) {
        console.log(error);
    }

}

exports.deleteAccount = async (req, res, next) => {
    try {
      const accountId = req.params.id;
      const deletedAccount = await Model.userModel.findByIdAndDelete(accountId);
  
      if (!deletedAccount) {
        return res.status(404).json({ message: 'Account not found' });
      }
      
      return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };