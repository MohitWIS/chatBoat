const mongoose = require('mongoose');

var Contact = mongoose.model('Contact',{
  first_name:{
    type:String,
    required: true
  },
  last_name:{
    type:String,
    required: true
  },
  email_id:{
    type:String,
    required: true
  },
  birth_day:{
    type:String,
    required: true
  },
  role_id:{
    type:String,
    required: true
  },   
  role:{
    type:String,
    require:true,
  }
});

module.exports = {Contact};