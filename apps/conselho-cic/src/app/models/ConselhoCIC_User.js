const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');
const ConselhoCIC_UserSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: true 
    },
    Mail: {
        type: String, 
        required: false,
        unique: true,
        lowercase:true
    },
    Phone: {
        type: String, 
        required: true,
        unique: true,
    },
    InPanic:{
        type: String, 
        default: 'false',
    },
    Leader:{
        type: String, 
        default: 'false',
    },
    Password: {
        type: String, 
        required: false,
        select: false
    },
    PasswordResetToken: {
        type: String,
        select: false
    },
    PasswordResetExpires: {
        type: Date,
        select: false 
    },
    IsMaster: {
        type: String,
        default: 'false'
    },
    Photo: {
        type: String,
    }
});
ConselhoCIC_UserSchema.pre('save', async function(next){
   const hash = await bcrypt.hash(this.Password, 10);
   this.Password = hash;
   next(); 
}, { timestamps: true });
ConselhoCIC_UserSchema.plugin(mongoosePaginate);
const ConselhoCIC_User = mongoose.model('ConselhoCIC_User', ConselhoCIC_UserSchema);
module.exports = ConselhoCIC_User;