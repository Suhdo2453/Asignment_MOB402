const db = require('../data/db');
const sortablePlugin = require('../plugins/plugin');

const categorySchema = db.mongoose.Schema(
    {
        name: {type: String, default: true}
    },
    {
        collection: 'category'
    }
);

categorySchema.plugin(sortablePlugin);

// categorySchema.query.sortable = function(req) {
//     if(req.query.hasOwnProperty('sort')){
//         let isValidate = [1, -1].includes(Number(req.query.order));
//         return this.sort({
//             [req.query.sort]: isValidate ? req.query.order : -1,
//         })
//     }
//     return this;
// };

let categoryModel = db.mongoose.model('categoryModel', categorySchema);

module.exports = {categoryModel}