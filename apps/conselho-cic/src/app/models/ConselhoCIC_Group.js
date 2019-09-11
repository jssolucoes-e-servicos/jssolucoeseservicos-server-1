const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const ConselhoCIC_GroupSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: true 
    },
    Description: {
        type: String, 
        required: false,
    },
    Members: [{
       User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConselhoCIC_User",
        },
        IsAdmin: {
            type: String, 
            default: 'false',
        },
    }]
}, { timestamps: true });
ConselhoCIC_GroupSchema.plugin(mongoosePaginate);
const ConselhoCIC_Group = mongoose.model('ConselhoCIC_Group', ConselhoCIC_GroupSchema);
module.exports = ConselhoCIC_Group;