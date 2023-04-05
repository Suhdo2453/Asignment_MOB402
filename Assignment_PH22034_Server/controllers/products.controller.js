const product = require('../models/product.model');
const category = require('../models/category.model');

exports.getList= async (req, res, next)=> {
    // Dữ liệu mẫu
    let _query = null;
    if (typeof(req.query.categoryId)!= 'undefined') {
        _query = {category: req.query.categoryId};
    }
    let data = await product.productModel.find(_query).populate('category');
    let categories = await category.categoryModel.find();
    res.render('products/list', {data, categories});
}

exports.getProduct= async (req, res, next)=> {
    let objPD = await product.productModel.findById(req.params.id).populate('category');
    let categories = await category.categoryModel.find();
    res.render('products/editProduct', {objPD, categories});
}

exports.editProduct= async (req, res, next)=> {
let id = req.params.id;
    let obj = new product.productModel();
    obj._id = id;
    obj.name = req.body.name;
    obj.description = req.body.description;
    obj.category = req.body.category;
    req.file?obj.image = req.file.path.split('\\').slice(1).join('\\'):
    obj.price = req.body.price;

    try {
             
        await product.productModel.findByIdAndUpdate(id, obj);
        res.redirect('/products');
    } catch (error) {
        console.log( error );
    }
}

exports.create = async (req, res, next)=>{

    let obj = new product.productModel();
    obj.name = req.body.name;
    obj.price = req.body.price;
    obj.image = req.file.path.split('\\').slice(1).join('\\');
    obj.category = req.body.category;
    obj.description = req.body.description;

    try {
        let new_pd = await obj.save();
            console.log(new_pd);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/products');
}

exports.delete = async (req, res, next)=>{
    try {
        const productId = req.params.id;
        const deletedAccount = await product.productModel.findByIdAndDelete(productId);
    
        if (!deletedAccount) {
          return res.status(404).json({ message: 'Account not found' });
        }
        
        return res.status(200).json({ message: 'Account deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }
}

exports.find = async (req, res, next)=>{
    let query = null;
    if (typeof(req.query.categoryId)!= 'undefined') {
        dieu_kien_loc = {price: {$gte: req.query.price}};
    }
    let data = await product.productModel.find(query);
    console.log(data);
    res.send(data);
}