const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const GroupSchema = new mongoose.Schema({
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
        ref: "User",
        },
        IsAdmin: {
            type: String, 
            default: 'false',
        },
    }]
}, { timestamps: true });
GroupSchema.plugin(mongoosePaginate);
const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;