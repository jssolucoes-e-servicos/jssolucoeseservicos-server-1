const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const IndicationSchema = new mongoose.Schema(
    {
        Visualized:{
            type: String,
            default: 'false'
        },
        User: {
            type: mongoose.Schema.Types.ObjectId, ref: "Customer" 
        },
        Product: {
            type: mongoose.Schema.Types.ObjectId, ref: "Product" 
        },
        Name:{
            type: String,
            required: true,
        },
        Phone:{
            type: String,
            required: true,
        },
        Address:{
            type: String,
            required: true,
        },
}, { timestamps: true });
IndicationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Indication', IndicationSchema);