const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');
const SisPecon_CustomerSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: true 
    },
    Email: {
        type: String, 
        required: false,
        unique: true,
        lowercase:true
    },
    InPanic:{
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
    Photo: {
        type: String,
    }
});
SisPecon_CustomerSchema.pre('save', async function(next){
   const hash = await bcrypt.hash(this.Password, 10);
   this.Password = hash;
   next(); 
}, { timestamps: true });
SisPecon_CustomerSchema.plugin(mongoosePaginate);
const SisPecon_Customer = mongoose.model('SisPecon_Customer', SisPecon_CustomerSchema);
module.exports = SisPecon_Customer;