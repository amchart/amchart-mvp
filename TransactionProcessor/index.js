'use strict';

require('dotenv').config({ silent: true });

const { TransactionProcessor } = require('sawtooth-sdk/processor');
const { JSONHandler, toInternalError } = require('./handlers');
const { VALIDATOR_URL, API_URL } = require('./../config');

// Initialize Transaction Processor
const tp = new TransactionProcessor(VALIDATOR_URL);
tp.addHandler(new JSONHandler());
tp.start();

const { getBatchBytes } = require('./transaction');

const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');

router.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../Web')));

router.get('/api/', function(req, res) {
  const currentDate = new Date();
  res.status(200).send(currentDate);
});

router.post('/APIURL_CLIENT/', function(req, res) {
  try {
    const url = API_URL + '/state?address=' + req.body.userAddr;
    request.get(url, function(error, response, body) {
      let resObj;
      if (error) {
        console.error(error);
        resObj = { error: true, body: null };
      } else {
        resObj = {
          error: false,
          body: body,
          time: new Date().getTime()
        };
      }
      res.status(200).send(resObj);
    });
  } catch (error) {
    toInternalError(error);
  }
});

router.post('/APIURL_CLIENT_SUBMIT/', function(req, res) {
  try {
    const body = req.body;
    const payLoadArr = body.payloadArr;
    payLoadArr.forEach(payloadObj => {
      payloadObj.time = new Date().getTime();
    });
    const batchBytes = getBatchBytes(payLoadArr, body.privateKey);
    request.post(
      {
        uri: `${API_URL}/batches?wait`,
        headers: { 'Content-Type': 'application/octet-stream' },
        body: batchBytes
      },
      function(error, response, body) {
        let resObj;
        if (error) {
          console.error(error);
          resObj = { error: true, body: null };
          res.status(200).send(resObj);
        } else {
          try {
            // Need try catch for url
            let url = JSON.parse(body).link;
            console.log(url);
            // This is used for checking succesfully commited transaction in sawtooth
            request.get(url, { timeout: 10000 }, function(
              error,
              response,
              body
            ) {
              if (error) {
                console.log(error);
                resObj = { error: true, body: null };
              } else {
                console.log(body);
                resObj = {
                  error: false,
                  body: body,
                  time: new Date().getTime()
                };
              }
              res.status(200).send(resObj);
            });
          } catch (error) {
            toInternalError(error);
          }
        }
      }
    );
  } catch (error) {
    toInternalError(error);
  }
});

const ETHEREUM_API_KEY = process.env.ETHEREUM_API_KEY;
const TOPIC_SIZE = 64;
//proxy hyperledger data for frontend
router.post('/tokenTransactions/', function(req, res) {
  try {
    const tokenTransactionQuery = req.body;
    var tokenAddress = tokenTransactionQuery['tokenAddress'];
    var receiverAddress = tokenTransactionQuery['receiverAddress'];
    var payeeAddress = tokenTransactionQuery['payeesAddress'];
    var blockStart = '0x0';
    var blockEnd = 'latest';
    var network = tokenTransactionQuery['network'];
    var ethereum_api_url =
      'https://rinkeby.etherscan.io/api?module=logs&action=getLogs';
    if (network === 'ropsten') {
      ethereum_api_url =
        'https://ropsten.etherscan.io/api?module=logs&action=getLogs';
    }

    //	receiverAddress = parseInt(receiverAddress);
    //	var topicTemp = receiverAddress.toString(16);
    var topicTemp = receiverAddress.slice(2);
    while (topicTemp.length < TOPIC_SIZE) topicTemp = '0' + topicTemp;
    receiverAddress = '0x' + topicTemp;

    //payeeAddress = parseInt(payeeAddress);
    //	var addressTemp = payeeAddress.toString(16);
    var addressTemp = payeeAddress.slice(2);
    while (addressTemp.length < TOPIC_SIZE) addressTemp = '0' + addressTemp;
    payeeAddress = '0x' + addressTemp;

    var url =
      ethereum_api_url +
      '&fromBlock=' +
      blockStart +
      '&toBlock=' +
      blockEnd +
      '&address=' +
      tokenAddress +
      '&topic2=' +
      receiverAddress +
      '&topic1=' +
      payeeAddress +
      '&apikey=' +
      ETHEREUM_API_KEY;

    request.get(url, function(error, response, body) {
      let resObj;
      if (error) {
        console.error(error);
        resObj = { error: true, body: null };
      } else {
        resObj = { error: false, body: body, time: new Date().getTime() };
      }
      res.status(200).send(resObj);
    });
  } catch (error) {
    toInternalError(error);
  }
});

app.use(router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.info('AmsysBC server listening on port', port);
  console.info('VALIDATOR_URL:', process.env.VALIDATOR_URL);
  console.info('API_URL:', process.env.API_URL);
  console.info('WEBSOCKET_URL:', process.env.WEBSOCKET_URL);
});
