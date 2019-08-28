var express = require('express');
const router = express.Router();

var firebase = require('firebase');

var { Contact } = require('../modules/contact');

var ObjectId = require('mongoose').Types.ObjectId;
const dialogflow = require('dialogflow');
const uuid = require('uuid');


router.get('/:userResponse',(req,res,next)=>{
  runSample();
  async function runSample(projectId = 'humanpixel-vjgpci') {
    
    // A unique identifier for the given session
    const sessionId = uuid.v4();
    
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    
    // The text query request.
    const request = {
    session: sessionPath,
    queryInput: {
      text: {
      // The query to send to the dialogflow agent
      text: req.params.userResponse,
      // The language used by the client (en-US)
      languageCode: 'en-US',
      },
    },
    };
    //console.log(request);
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    res.send(responses);
    console.log(responses[0].queryResult.fulfillmentMessages[1].suggestions);
    console.log(responses[0].queryResult.fulfillmentMessages[0].simpleResponses);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
    } else {
    console.log(`  No intent matched.`);
    }
  }
  //res.send(req.params.userResponse);
  

});


module.exports  = router;