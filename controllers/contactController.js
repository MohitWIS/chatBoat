var express = require('express');
const router = express.Router();

var firebase = require('firebase');

var { Contact } = require('../modules/contact');

var ObjectId = require('mongoose').Types.ObjectId;


var config = {
  /*apiKey: "AIzaSyBxZTXb2ON4J7AGqcK0dubl9j0FEnkDl-I",
  authDomain: "wisethink-test-mdjgul.firebaseio.com",
  databaseURL: "https://wisethink-test-mdjgul.firebaseio.com",
  projectId: "wisethink-test-mdjgul.firebaseio.com",
  storageBucket: "wisethink-test-mdjgul.appspot.com",
  messagingSenderId: "1065933136983"*/

  apiKey: "AIzaSyBo2fnTc_S1Nc4nHTAZvwZfJUoITqiwuug",
  authDomain: "wisethink-test-oissxs.firebaseapp.com",
  databaseURL: "https://wisethink-test-oissxs.firebaseio.com",
  projectId: "wisethink-test-oissxs",
  storageBucket: "wisethink-test-oissxs.appspot.com",
  messagingSenderId: "512671804216"
};
  firebase.initializeApp(config);


  console.log("HTTP Get Request");
  var userReference = firebase.database().ref("/request/");


router.get('/firebaseget/',(req,res)=>{
  
  //Attach an asynchronous callback to read the data
    userReference.once("value", 
      function(snapshot) {
        res.send(snapshot.val());
        console.log(snapshot.val());
        //res.json(snapshot.val());
        //userReference.off("value");
        }, 
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        //res.send("The read failed: " + errorObject.code);
    });
        
});


router.get('/firebaseDelete/:key',(req,res)=>{
  //req.params.key
  //Attach an asynchronous callback to read the data
    res.json('retrieving the contact');
    userReference.child(req.params.key).remove();
        
});

router.get('/',(req,res)=>{
  Contact.find((err,docs)=>{
    if(!err){res.send(docs); }
    else{ console.log('Error in Get Function : '+ JSON.stringify(err,undefined,2));}
  });
});


router.get('/:first_name/:last_name',(req,res,next)=>{
  //res.send('retrieving the contact');
  Contact.find({first_name:req.params.first_name,last_name:req.params.last_name},function(err,contact){
    res.json(contact);
  });
});


router.post('/',(req,res)=>{
  let  newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id:req.body.email_id,
    birth_day: req.body.birth_day,
    role_id: req.body.role_id,
    role: req.body.role,
  });

  newContact.save((err,contact)=>{
    if(err){
      res.json({msg : 'Failed to Add'});
    }
    else{
      res.json({msg : 'Added'});
    }
  });
});

router.delete('/:id',(req,res,next)=>{
  Contact.remove({_id:req.params.id},function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  })
});


router.post('/:id',(req,res,next)=>{
  let  newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id:req.body.email_id,
    birth_day: req.body.birth_day,
    role_id: req.body.role_id
  });

  var newvalues = { $set: {first_name: newContact.first_name, last_name: newContact.last_name,email_id:newContact.email_id,birth_day:newContact.birth_day,role_id:newContact.role_id } };
  Contact.update({_id:req.params.id},newvalues,function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  })
});


module.exports  = router;
