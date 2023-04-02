const db = require('../data/db');

const productSchema = db.mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        category: {type: db.mongoose.Types.ObjectId, ref:'categoryModel', required: true},
        description: {type: String, required: false}
    },
    {
        collection: 'products',
    }
    );

    let productModel = db.mongoose.model('productModel', productSchema);

    module.exports = {productModel}