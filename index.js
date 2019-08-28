var express = require('express');

const { mongoose } = require('./db.js');
var bodyparser = require('body-parser');
var cors = require('cors');
var router = express.Router();
const request = require('request');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

var guestController = require('./controllers/guestController.js')
var contactController = require('./controllers/contactController.js');

var chatBotController = require('./controllers/chatBotController.js');

var reportController = require('./controllers/ReportController.js')
var app = express();

const port = 3000;


app.use(cors());

//console.log("hi");
app.use(bodyparser.json());

app.listen(port,()=>{
  console.log('server stareted = '+port);
});



/*test(function(rtr){
  console.log("hi = "+rtr);
});*/

/*function test(callback){
const url = "https://script.google.com/macros/s/AKfycbxDJXtoovgL4DVJ1SEgU0AdIO2IluySbdauHillT3279LE8y-M/exec?callback=ctrlq&folderName=9717769509&SubFolderName=19-20&action=insert";
request.get(url, (error, response, body) => {
  //let json = JSON.parse(body);
  console.log(body);
  return callback(body);
});

}*/
app.use('/contact',contactController);
app.use('/chatBot',chatBotController);
app.use('/report',reportController);
app.use('/guest',guestController);