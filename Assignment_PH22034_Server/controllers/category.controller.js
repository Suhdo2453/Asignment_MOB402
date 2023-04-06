const Model = require('../models/category.model');

exports.getList= async (req, res, next)=> {
    let itemsPerPage = 2;
    let page = parseInt(req.query.page) || 1;
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = page * itemsPerPage;
    let name = req.query.name||null;
    let condition = {};

    if (name != ''&& name) {
        condition.name = { $regex: name, $options: 'i' };
    }

    let data = await Model.categoryModel.find(condition);

    let pageCount = Math.ceil(data.length / itemsPerPage);
    let items = data.slice(startIndex, endIndex);

    res.render('category/list', {title: 'Category', data:items, pageCount, currentPage: page});
}

exports.getProduct= async (req, res, next)=> {
    let objPD = await  Model.categoryModel.findById(req.params.id);
    res.render('category/editCategory', {objPD});
}

exports.editProduct= async (req, res, next)=> {
let id = req.params.id;
    let obj = new Model.categoryModel();
    obj._id = id;
    obj.name = req.body.name;

    try {
             
        await Model.categoryModel.findByIdAndUpdate(id, obj);
        res.redirect('/category');
    } catch (error) {
        console.log( error );
    }
}

exports.create = async (req, res, next)=>{

    let obj = new Model.categoryModel();
    obj.name = req.body.name;

    try {
        let new_pd = await obj.save();
            console.log(new_pd);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/category');
}

exports.delete = async (req, res, next)=>{
    try {
        const categoryId = req.params.id;
        const deletedCategory = await Model.categoryModel.findByIdAndDelete(categoryId);
    
        if (!deletedCategory) {
          return res.status(404).json({ message: 'Category not found' });
        }
        
        return res.status(200).json({ message: 'Category deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }
}

exports.searchCategory = async (req, res, next)=>{
    const regex = new RegExp(req.query.text, 'i');
    let categories = await Model.categoryModel.find({name: regex});
    res.json(categories);
}