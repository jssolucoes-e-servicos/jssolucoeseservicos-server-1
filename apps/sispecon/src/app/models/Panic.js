const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const PanicSchema = new mongoose.Schema({
    UserRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    UserResponse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contributor",
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
PanicSchema.plugin(mongoosePaginate);
const Panic = mongoose.model('anic', PanicSchema);
module.exports = Panic;