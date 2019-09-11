const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');
const ContributorSchema = new mongoose.Schema({
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
ContributorSchema.pre('save', async function(next){
   const hash = await bcrypt.hash(this.Password, 10);
   this.Password = hash;
   next(); 
}, { timestamps: true });
ContributorSchema.plugin(mongoosePaginate);
const Contributor = mongoose.model('Contributor', ContributorSchema);
module.exports = Contributor;