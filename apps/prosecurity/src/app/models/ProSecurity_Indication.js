const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ProSecurity_IndicationSchema = new mongoose.Schema(
    {
        Visualized:{
            type: String,
            default: 'false'
        },
        User: {
            type: mongoose.Schema.Types.ObjectId, ref: "ProSecurity_Customer" 
        },
        Product: {
            type: mongoose.Schema.Types.ObjectId, ref: "ProSecurity_Product" 
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
ProSecurity_IndicationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ProSecurity_Indication', ProSecurity_IndicationSchema);