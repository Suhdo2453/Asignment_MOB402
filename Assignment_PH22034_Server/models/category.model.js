const db = require('../data/db');

const categorySchema = db.mongoose.Schema(
    {
        name: {type: String, default: true}
    },
    {
        collection: 'category'
    }
);

let categoryModel = db.mongoose.model('categoryModel', categorySchema);

module.exports = {categoryModel}