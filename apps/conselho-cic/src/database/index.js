const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://servicesapp:servicesapp@cluster0-ejnyb.mongodb.net/ConselhoCIC?retryWrites=true', {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
