const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const ProductSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: false
    },
    Details: {
        type: String, 
        required: false
    },
}, { timestamps: true });
ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;