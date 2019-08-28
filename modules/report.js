const mongoose = require('mongoose');

var Report = mongoose.model('Report',{
  Guest_name: {type:String},
  Guest_mobileNo: {type:Number},
  Guest_checkIn: {type:String},
  Guest_checkOut: {type:String},
  Guest_roomNo: {type:Number},
  Guest_hotel_name: {type:String},
  Guest_requestedFor: {type:String},
  Guest_requestedQuantity: {type:String}
});

module.exports = {Report};
