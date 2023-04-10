const product = require('../../models/product.model');

exports.getList= async (req, res, next)=> {

    try {
        let data = await product.productModel.find();
        if(data){
            return res.status(200).json(
                {
                    msg: 'get data',
                    data: data
                }
            );
        }else{
            return res.status(204).json(
                {
                    msg: 'not found',
                }
            );
        }
    } catch (error) {
        return res.status(error.status).json(
            {
                msg: error.message
            }
        )
    }

}

exports.getOne= async (req, res, next)=>{
    var id = req.params.id; // Lấy ID từ đường dẫn
    try {
        let data = await product.productModel.findById(id).populate('category');
        console.log(data);
        if (data) {
            return res.status(200).json(
                {
                    msg: 'get data',
                    data: data
                }
            );
        } else {
            return res.status(404).json({ msg: 'Not Found' });
        }
    } catch (error) {
        return res.status(error.status).json(
            {
                msg: error.message
            }
        )
    }
    
}

exports.edit = (req, res, next) => {
    res.status(200).json({msg: 'Sua'});
}

exports.delete = (req, res, next) => {
    res.status(200).json({msg: 'Xoa'});
}