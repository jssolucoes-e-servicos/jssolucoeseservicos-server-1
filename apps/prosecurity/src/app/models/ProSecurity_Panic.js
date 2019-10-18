const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const ProSecurity_PanicSchema = new mongoose.Schema({
    UserRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProSecurity_Customer",
        required: true,
    },
    UserResponse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProSecurity_Contributor",
        required: false,
    },
    Ocorrency:{
        type: String, 
        required: false
    },
    Lat: {
        type: String, 
        required: false
    },
    Long: {
        type: String, 
        required: false
    },
    Observation: {
        type: String, 
        required: false
    },
    Closed:{
        type: String, 
        default:'false'
    },
    CreatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
ProSecurity_PanicSchema.plugin(mongoosePaginate);
const ProSecurity_Panic = mongoose.model('ProSecurity_Panic', ProSecurity_PanicSchema);
module.exports = ProSecurity_Panic;