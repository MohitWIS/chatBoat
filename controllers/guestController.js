var express = require('express');
const router = express.Router();



var { Guest } = require('../modules/guest');


var ObjectId = require('mongoose').Types.ObjectId;


router.get('/',(req,res)=>{
  Guest.find((err,docs)=>{
    if(!err){
      res.send(docs); 
    }
    else{ console.log('Error in Get Function : '+ JSON.stringify(err,undefined,2));}
  });
});

router.get('/UserAuth/:name/:mobileNo',(req,res,next)=>{
  //res.send('retrieving the contact');
  Guest.find({name:req.params.name,mobileNo:req.params.mobileNo},function(err,contact){
    res.json(contact);
  });
});

router.get('/GuestDetails/:mobileNo',(req,res,next)=>{
  //res.send('retrieving the contact');
  Guest.find({mobileNo:req.params.mobileNo},function(err,contact){
    res.json(contact);
  });
});

router.post('/',(req,res)=>{
  var guest = new Guest({
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    checkIn:req.body.checkIn,
    checkOut: req.body.checkOut,
    roomNo: req.body.roomNo,
    hotel_name: req.body.hotel_name
  });

  guest.save((err,guestAdd)=>{
    if(err){
      res.json({msg : 'Failed to Add'});
    }
    else{
      res.json({msg : 'Added'});
    }
  });
});

router.delete('/:id',(req,res,next)=>{
  Guest.remove({_id:req.params.id},function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  })
});


router.get('/:name/:MobileNo',(req,res,next)=>{
  res.json('retrieving the contact');
  var accountSid = 'ACafb27964fb1b23d0d5e7ff77a017af88'; // Your Account SID from 
  var authToken = '0995217e258c93bb385e40a19fbb8289';   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);

  client.messages.create({
      body: 'Hello '+req.params.name+' this is from Node',
      to:  '+91'+req.params.MobileNo,//'+917011474342',  // Text this number
      from: '+16507507233' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
});


router.get('/getMsgDetals/msgId/:msgId',(req,res,next)=>{
  //res.json('retrieving the contact in bellow');
  var twilio = require('twilio');
  const accountSid = 'ACafb27964fb1b23d0d5e7ff77a017af88';
  const authToken = '0995217e258c93bb385e40a19fbb8289';
  const client = require('twilio')(accountSid, authToken);

  client.messages(req.params.msgId)
        .fetch()
        .then(message => res.json("test "+message.dateCreated));

        //message.dateCreated
});


router.get('/:id',(req,res,next)=>{
  //res.send('retrieving the contact');
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No Record found');

    Guest.findById(req.params.id,(err,doc)=>{
      if(!err){res.send(doc); }
      else{ console.log("error findbyid"); }
    })
});


router.post('/:id',(req,res,next)=>{
  let  guest = new Guest({
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    checkIn:req.body.checkIn,
    checkOut: req.body.checkOut,
    roomNo: req.body.roomNo
  });

  var newvalues = { $set: {name: guest.name, mobileNo: guest.mobileNo,checkIn:guest.checkIn,checkOut:guest.checkOut,roomNo:guest.roomNo } };
  Guest.update({_id:req.params.id},newvalues,function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  })
});


module.exports  = router;