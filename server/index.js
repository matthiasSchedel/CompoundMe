var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase");

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

// inizialize Express
var app = express();
app.use(bodyParser());

/**
 * @function
 * @name parseCategoryCode
 * @param {String} categoryCode VISA merchant category code
 * @returns {String} category parsed category String
 */
function parseCategoryCode(categoryCode) {
  // eval transformation of categoryCode to category
  // TODO

  var category = "discount stores";

  return category;
}

/**
 * @function
 * @name pushTransactionToDb
 * @param {Object} transaction transaction to be inserted into firebase
 * @param {String} userid user to whom the transaction belongs
 */
function pushTransactionToDb(transaction, userid) {
  db.ref(`/users/${userid}/transactions`).push(transaction);
  // db.ref("/users/userid/transaction") .push({ descisionId, ... })
}

/**
 * @function
 * @name getUserByPrimaryAccoutNumber
 * @param {string} primaryAccountNumber VISA account number to be matched to CM username
 * @returns {string}
 */
function getUserByPrimaryAccoutNumber(primaryAccountNumber) {
  const username = db.ref(`/translateCardToUser/${primaryAccountNumber}`).once(
    "value",
    (snapshot) => {
      return snapshot.val();
    },
    (errorObject) => {
      console.error("error", errorObject);
    }
  );
  return username;
}

// app listening on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// POST of VISA-transaction-notification
app.post("/api/transactionDetails", (req, res, next) => {
  // extract data from incoming request body
  [...notificationDetails] = req.body.resource.notificationDetails;
  notificationPayload =
    notificationDetails[0].outBoundAlertsNotificationPayload;

  transactionDetails = notificationPayload.transactionDetails;
  // console.log(transactionDetails);

  // retrieving fields from VISA-Request
  const primaryAccountNumber = transactionDetails.primaryAccountNumber;
  const merchantInfo = transactionDetails.merchantInfo;
  const amount = transactionDetails.cardholderBillAmount / 100;

  const merchantCategoryCode = merchantInfo.merchantCategoryCode;
  const merchantName = merchantInfo.name;

  // parse merchantCategoryCode into merchantCategory
  const merchantCategory = parseCategoryCode(merchantCategoryCode);

  // constructing transaction object to be stored in firebase
  const transaction = {
    cardNumber: primaryAccountNumber,
    amount: amount,
    merchantName: merchantName,
    merchantCategory: merchantCategory,
    timestamp: transactionDetails.requestReceivedTimeStamp,
    userId: transactionDetails.userIdentifier
  };

  // pushing transaction to db when user is identified
  const user = getUserByPrimaryAccoutNumber(primaryAccountNumber).then(
    (value) => {
      username = value.val();
      pushTransactionToDb(transaction, username);
    }
  );

  // default response - currently no logic
  res.send(transaction);
});
