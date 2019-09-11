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
    CreatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
PanicSchema.plugin(mongoosePaginate);
const Panic = mongoose.model('Panic', PanicSchema);
module.exports = Panic;