var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase");
var request = require("request");

var sampleTransactionInvest = require("./samples/transactionSampleInvestment.json");
const BEVESTOR = "BEVESTOR";

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
  switch (categoryCode) {
    case "0000":
      return BEVESTOR;
      break;
    case "5321":
      return "DepartmentStore";
      break;
    case "5462":
      return "Bakery";
      break;
    case "5732":
      return "Electronics";
      break;
    case "5814":
      return "FastFood";
      break;
    case "5921":
      return "Beverages";
      break;

    default:
      break;
  }
}

/**
 * @function
 * @name pushTransactionToDb
 * @param {Object} transaction transaction to be inserted into firebase
 * @param {String} userid user to whom the transaction belongs
 */
function pushTransactionToDb(transaction, userid) {
  return db.ref(`/users/${userid}/transactions`).push(transaction);
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

/**
 * @function
 * @name getTransactionByUserIdTransaction
 * @param {Stirng} userid transactionid on this userid is to be retrieved
 * @param {String} transactionid transactionid to be retrieved
 * @returns {Object} retrieved transaction
 */
function getTransactionByUserIdTransaction(userid, transactionid) {
  const transaction = db
    .ref(`/users/${userid}/transactions/${transactionid}`)
    .once(
      "value",
      (snapshot) => {
        return snapshot.val();
      },
      (errorObject) => {
        console.error("error", errorObject);
      }
    );
  return transaction;
}

/**
 * @function
 * @name transformTransactionIntoVisa
 * @param {Object} transaction transcation to be transformed into VISA transaction
 * @returns {Object} transaction in VISA format
 */
// function transformTransactionIntoVisa(transaction) {
//   return {
//     receivedTimestamp: new Date(),
//     resource: {
//       notificationDetails: [
//         {
//           outBoundAlertsNotificationPayload: {
//             transactionDetails: {
//               primaryAccountNumber: transaction.cardNumber,
//               userIdentifier: transaction.userId,
//               cardholderBillAmount: transaction.amount * 100,
//               requestReceivedTimeStamp: new Date(),
//               merchantInfo: {
//                 name: BEVESTOR,
//                 addressLines: ["Hamburger Allee 14"],
//                 city: "Frankfurt am Main",
//                 postalCode: "60486",
//                 countryCode: "GER",
//                 merchantCategoryCode: "0000",
//                 currencyCode: "840"
//               }
//             },
//             transactionOutcome: {
//               documentID: "ctc-vd-1275e7cc-6acb-4504-a812-84f70a550262",
//               transactionApproved: "ACCEPTED",
//               decisionResponseTimeStamp: "2018-05-31 17:23:57",
//               decisionID: "ctc-vd-ed7d4976-ce02-4a11-a34e-4008681ffadc"
//             }
//           }
//         }
//       ]
//     }
//   };
// }

/**
 * @function
 * @name getUserByPrimaryAccoutNumber
 * @param {string} primaryAccountNumber VISA account number to be matched to CM username
 * @returns {string}
 */
async function getApplicableRuleByCategory(category, username) {
  let newfetchedRules;
  // get rules by username
  let rules = await db
    .ref(`/users/${username}/rules`)
    .once("value", (snapshot) => {
      // extract actual rules from firebase response
      let fetchedRules = Object.entries(snapshot.val());

      // only retrieve active rules with matching category
      newfetchedRules = fetchedRules.filter(
        (item) => item[1].active && item[1].category == category
      );
      return newfetchedRules;
    });
  console.log("newfetchedRules", newfetchedRules);
  // mock: only fetch one rule
  return newfetchedRules[0];
}

/**
 * @function
 * @name createInvestmentTransaction
 * @param {Object} transaction transaction to be invested upon
 * @returns new investment Object
 */
async function createInvestmentTransaction(transaction, username) {
  var applicableRules = await getApplicableRuleByCategory(
    transaction.merchantCategory,
    username
  );
  if (applicableRules) {
    [ruleId, rule] = applicableRules;

    var newAmount;

    if (rule.ruleType == "Amount") {
      newAmount = rule.amount;
    } else {
      newAmount = Math.ceil(transaction.amount / 10) * 10 - transaction.amount;
      newAmount = Number(newAmount.toFixed(2));
    }

    const merchantCategory = parseCategoryCode("0000");

    return {
      amount: newAmount,
      cardNumber: transaction.cardNumber,
      decisionID: transaction.decisionID + "1",
      merchantCategory: merchantCategory,
      merchantName: BEVESTOR,
      timestamp: transaction.timestamp,
      userId: transaction.userId
    };
  } else {
    return {};
  }
}

/**
 * @function
 * @name executeInvestment
 * @param {Object} transaction investment transaction
 * @param {String} username investing username
 * @description "loop around" for second transaction
 */
function executeInvestment(transaction, username) {
  GetUser(transaction.cardNumber, transaction);
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
  transactionOutcome = notificationPayload.transactionOutcome;

  // retrieving fields from VISA-Request
  const cardNumber = transactionDetails.primaryAccountNumber;
  const merchantInfo = transactionDetails.merchantInfo;
  const amount = transactionDetails.cardholderBillAmount / 100;
  const timestamp = transactionDetails.requestReceivedTimeStamp;
  const userId = transactionDetails.userIdentifier;
  const merchantCategoryCode = merchantInfo.merchantCategoryCode;
  const merchantName = merchantInfo.name;
  const decisionID = transactionOutcome.decisionID;

  // parse merchantCategoryCode into merchantCategory
  const merchantCategory = parseCategoryCode(merchantCategoryCode);

  // constructing transaction object to be stored in firebase
  const transaction = {
    decisionID,
    cardNumber,
    amount,
    merchantName,
    merchantCategory,
    timestamp,
    userId
  };

  var username = GetUser(cardNumber, transaction);

  // default response - currently no logic
  transaction.responseCode = 200;
  res.send(transaction);
});

async function GetUser(cardNumber, transaction) {
  let username;
  try {
    let result = await getUserByPrimaryAccoutNumber(cardNumber)
      .then((value) => {
        return {
          transaction: pushTransactionToDb(transaction, value.val()),
          username: value.val()
        };
      })
      .then((res) => {
        username = res.username;
        //
        // get transaction to be invested upon back into scope
        getTransactionByUserIdTransaction(
          res.username,
          res.transaction.key
        ).then((value) => {
          transaction = value.val();
          //
          // no new VISA transaction, if incoming transaction is BEVESTOR transaction
          if (transaction.merchantCategory != BEVESTOR) {
            //
            // create investment visa transaction from original shopping transaction
            createInvestmentTransaction(transaction, username).then((res) => {
              //
              // only mock seconds transaction if amount to be invested is not 0
              if (res && res.amount) {
                executeInvestment(res, username);
              }
            });
          }
        });
      });
  } catch (err) {
    console.log("err", err);
  }
}
