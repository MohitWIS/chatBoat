var express = require('express');
const router = express.Router();



var { Report } = require('../modules/report');


var ObjectId = require('mongoose').Types.ObjectId;

router.get('/',(req,res)=>{
  Report.find((err,docs)=>{
    if(!err){
      res.send(docs); 
    }
    else{ console.log('Error in Get Function : '+ JSON.stringify(err,undefined,2));}
  });
});

router.post('/',(req,res)=>{
  var report = new Report({
    Guest_name: req.body.Guest_name,
    Guest_mobileNo: req.body.Guest_mobileNo,
    Guest_checkIn:req.body.Guest_checkIn,
    Guest_checkOut: req.body.Guest_checkOut,
    Guest_roomNo: req.body.Guest_roomNo,
    Guest_hotel_name: req.body.Guest_hotel_name,
    Guest_requestedFor: req.body.Guest_requestedFor,
    Guest_requestedQuantity: req.body.Guest_requestedQuantity
  });

  report.save((err,guestAdd)=>{
    if(err){
      res.json({msg : 'Failed to Add'});
    }
    else{
      res.json({msg : 'Added'});
    }
  });
});

module.exports  = router;