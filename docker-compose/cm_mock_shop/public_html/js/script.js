// const item = [
//     {
//         name:"iPhone XS",
//         price:"",
//     },
//     {

//     }
// ];
//merchantInfo
//cardHolderBillAmount
//requestRecieveTimeStamp
//merchantCategoryCode
//merchantInfo.Name
//transactionOutcome.DecisionId
const params = 
{
    "primaryAccountNumber": "123-4567-8901-2345-2889",
    "userIdentifier": "56lin-j4awe-9x01",
    "requestReceivedTimeStamp": "2018-05-31 17:23:57",
    "merchantName": "WallMart"
};


async function post() {


    var url = "http://0.0.0.0:3000/api/transactionDetails";
    var method = "POST";
    var postData = {

        "receivedTimestamp": "2018-05-31 17:27:21.023",
        "processingTimeinMs": 140,
        "resource": {
            "notificationDetails": [
                {
                    "outBoundAlertsNotificationPayload": {
                        "transactionDetails": {
                            "primaryAccountNumber": "123-4567-8901-2345-2889",
                            "userIdentifier": "56lin-j4awe-9x01",
                            "cardholderBillAmount": 10010,
                            "billerCurrencyCode": "702",
                            "requestReceivedTimeStamp": "2018-05-31 17:23:57",
                            "merchantInfo": {
                                "name": "WallMart",
                                "addressLines": [
                                    "6675 Business Center Dr"
                                ],
                                "city": "Highlands Ranch",
                                "region": "CO",
                                "postalCode": "80130",
                                "countryCode": "USA",
                                "merchantCategoryCode": "5310",
                                "currencyCode": "840"
                            }
                        },
                        "transactionOutcome": {
                            "documentID": "ctc-vd-1275e7cc-6acb-4504-a812-84f70a550261",
                            "transactionApproved": "DECLINED",
                            "decisionResponseTimeStamp": "2018-05-31 17:23:57",
                            "decisionID": "ctc-vd-ed7d4976-ce02-4a11-a34e-4008681ffadb",
                            "alertDetails": [
                                {
                                    "ruleCategory": "PCT_GLOBAL",
                                    "ruleType": "NONE",
                                    "thresholdAmount": 900,
                                    "alertReason": "DECLINE_BY_SPEND_LIMIT",
                                    "controlTargetType": "CARD_LEVEL"
                                }
                            ]
                        },
                        "transactionTypes": [
                            "TCT_CROSS_BORDER",
                            "TCT_ATM_WITHDRAW"
                        ]
                    },
                    "outboundCallDetails": {
                        "status": "IN_PROGRESS",
                        "httpResponseCode": 0
                    },
                    "notificationDetailId": "ctc-vd-9f7740c8-bcfd-44dd-990c-d3889d74dc9a"
                }
            ],
            "paginationData": {
                "startIndex": "1",
                "pageLimit": "3",
                "firstPage": true,
                "lastPage": true,
                "recordCount": 2,
                "totalCount": 2,
                "totalPages": 1
            }
        }


    };

    var shouldBeAsync = true;

    var request = new XMLHttpRequest();

    request.open(method, url, shouldBeAsync);
    
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("accept", "*");
        // request.setRequestHeader("Access-Control-Allow-Headers", "*");
        request.setRequestHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        let response;
        try {
        await request.send(JSON.stringify(postData));
        // console.log('response',request.onerror(err => console.log('err',err)));
        } catch(err)
        {
            console.log('err',err);
        }

    request.onload = async function () {


        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = request.responseText; // Returned data, e.g., an HTML document.
        console.log('status', status);


        
    }

}