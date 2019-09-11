const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const ConselhoCIC_PanicSchema = new mongoose.Schema({
    UserRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConselhoCIC_User",
        required: true,
    },
    UserResponse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConselhoCIC_User",
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
}, { timestamps: true });
ConselhoCIC_PanicSchema.plugin(mongoosePaginate);
const ConselhoCIC_Panic = mongoose.model('ConselhoCIC_Panic', ConselhoCIC_PanicSchema);
module.exports = ConselhoCIC_Panic;