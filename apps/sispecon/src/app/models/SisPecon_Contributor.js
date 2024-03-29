const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');
const SisPecon_ContributorSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: true 
    },
    User: {
        type: String, 
        required: false,
        unique: true,
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
SisPecon_ContributorSchema.pre('save', async function(next){
   const hash = await bcrypt.hash(this.Password, 10);
   this.Password = hash;
   next(); 
}, { timestamps: true });
SisPecon_ContributorSchema.plugin(mongoosePaginate);
const SisPecon_Contributor = mongoose.model('SisPecon_Contributor', SisPecon_ContributorSchema);
module.exports = SisPecon_Contributor;