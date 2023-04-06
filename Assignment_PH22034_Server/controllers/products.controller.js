const product = require('../models/product.model');
const categoryMD = require('../models/category.model');

exports.getList= async (req, res, next)=> {
    let itemsPerPage = 2;
    let page = parseInt(req.query.page) || 1;
    let selectedOption = req.query.category;  
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = page * itemsPerPage;
    let category = req.query.category||null;
    let name = req.query.name||null;
    let sort = req.query.sort || 'price';
    let order = req.query.order; // hướng sắp xếp, -1 là giảm dần, 1 là tăng dần
    let condition = {};

    if (category != '' && category) {
        condition.category = category;
    }

    if (name != ''&& name) {
        condition.name = { $regex: name, $options: 'i' };
    }

    let data = await product.productModel.find(condition)
                                        .sort({ [sort]: order })
                                        .populate('category');
    let categories = await categoryMD.categoryModel.find();

    let pageCount = Math.ceil(data.length / itemsPerPage);
    let items = data.slice(startIndex, endIndex);
    res.render('products/list', {title: 'Products',  data:items, pageCount, currentPage: page, selectedOption, categories, sort, order});
}

exports.getProduct= async (req, res, next)=> {
    let objPD = await product.productModel.findById(req.params.id).populate('category');
    let categories = await categoryMD.categoryModel.find();
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

exports.detail = async (req, res, next)=>{
    let data = await product.productModel.findOne({_id:req.query.id}).populate('category');
    console.log(data);

    res.render('products/detail', {data});

}