const mongoose = require('mongoose');

var Guest = mongoose.model('Guest',{
  name: {type:String},
  mobileNo: {type:Number},
  checkIn: {type:String},
  checkOut: {type:String},
  roomNo: {type:Number},
  hotel_name: {type:String}
});

module.exports = {Guest};
