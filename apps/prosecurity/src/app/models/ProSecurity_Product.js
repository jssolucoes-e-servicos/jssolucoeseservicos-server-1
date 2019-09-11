const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const ProSecurity_ProductSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: false
    },
    Details: {
        type: String, 
        required: false
    },
}, { timestamps: true });
ProSecurity_ProductSchema.plugin(mongoosePaginate);
const ProSecurity_Product = mongoose.model('ProSecurity_Product', ProSecurity_ProductSchema);
module.exports = ProSecurity_Product;