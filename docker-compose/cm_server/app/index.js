var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase");
var cors = require('cors');

// initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCi3x67SV178IUIAETk8H6AqTIZVOfZKEE",
  authDomain: "symbioticon2018-e2f17.firebaseapp.com",
  databaseURL: "https://symbioticon2018-e2f17.firebaseio.com",
  projectId: "symbioticon2018-e2f17",
  storageBucket: "symbioticon2018-e2f17.appspot.com",
  messagingSenderId: "1005305567833"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var db = firebase.database();
const app_url = "*";
// inizialize Express
var app = express();
app.use(cors());
app.use(bodyParser());

function parseCategoryCode(categoryCode) {
  // eval transformation of categoryCode to category

  var category = "Fast-Food";

  return category;
}

function pushTransactionToDb(transaction, userid) {
  db.ref(`/users/${userid}/transactions`).push(transaction);
  // db.ref("/users/userid/transaction") .push({ descisionId, ... })
}

function getUserByPrimaryAccoutNumber(primaryAccountNumber) {
  // db.ref(``);
}

app.listen(3000,() => {
  console.log("Server running on port 3000");
});
app.post("/api/transactionDetails", (req, res, next) => {

  console.log('Got request - with headers', JSON.stringify(req.headers));
  // extract data from incoming request body
  [...notificationDetails] = req.body.resource.notificationDetails;
  notificationPayload =
    notificationDetails[0].outBoundAlertsNotificationPayload;

  const transaction = {
    primaryAccountNumber:
      notificationPayload.transactionDetails.primaryAccountNumber,
    userIdentifier: notificationPayload.transactionDetails.userIdentifier,
    requestReceivedTimeStamp:
      notificationPayload.transactionDetails.requestReceivedTimeStamp,
    merchantName: notificationPayload.transactionDetails.merchantInfo.name
  };
    // res.append('Access-Control-Allow-Origin', "*");
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
  // console.log(transaction);
  console.log('Got request from',req.originalUrl);
  res.send(transaction);
  // body = req.body;

  // const transaction = {
  //   cardNr: body.primaryAccountNumber,
  //   amount: body.transactionAmount,
  //   merchantName: body.MerchantInfo.name,
  //   merchantCategory:
  // };
  // const cardNumber =
  //   // userId to be fetched from firebase by mapping VISA-Card-number to userId
  //   // const userId;
  //   // db.ref("/users/"+userId)

  //   (res.body = req.body);
  // res.body.reply = {
  //   statusCode: "200"
  // };
  // res.send(res.body);
});
