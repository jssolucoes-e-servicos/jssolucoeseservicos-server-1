const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const SisPecon_PanicSchema = new mongoose.Schema({
    UserRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SisPecon_Customer",
        required: true,
    },
    UserResponse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SisPecon_Contributor",
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
SisPecon_PanicSchema.plugin(mongoosePaginate);
const SisPecon_Panic = mongoose.model('anic', SisPecon_PanicSchema);
module.exports = SisPecon_Panic;