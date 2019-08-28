var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ChatDB',{ useNewUrlParser: true });



mongoose.connection.on('connected',()=>{
 console.log("contected to 27017");
});

module.exports = mongoose;