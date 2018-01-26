'use strict';

const $ = require('jquery');

const { WEBSOCKET_URL } = require('./../../config');

const {
  PREFIX,
  getAssetUserAddress,
  getAssetUserMedicalAddress,
  getAssetUserVitalsAddress,
  getAssetUserAppointmentsAddress,
  getAssetUserLabsAddress,
  getAssetUserInsuranceAddress,
  getAssetUserContactAddress,
  getAssetUserPaymentAddress
} = require('./../../common');

const getSpecificPoster = (cb, name) => {
  const userAddr = getAssetUserAddress(name);
  var reqData = { userAddr: userAddr };
  $.post(/APIURL_CLIENT/, reqData, res => {
    if (res.error) {
      console.log('There is some issue in validator for getting poster');
    } else {
      const data = JSON.parse(res.body).data;
      cb(
        data.reduce(
          (processed, datum) => {
            if (datum.data !== '') {
              const parsed = JSON.parse(atob(datum.data));
              processed.poster.push(parsed);
            }
            return processed;
          },
          { poster: [] }
        )
      );
    }
  });
};

const getStateTabs = (cb, username, tabname) => {
  var userAddr = '';
  switch (tabname) {
    case 'medical':
      userAddr = getAssetUserMedicalAddress(username);
      break;
    case 'vitals':
      userAddr = getAssetUserVitalsAddress(username);
      break;
    case 'appointments':
      userAddr = getAssetUserAppointmentsAddress(username);
      break;
    case 'labs':
      userAddr = getAssetUserLabsAddress(username);
      break;
    case 'insurance':
      userAddr = getAssetUserInsuranceAddress(username);
      break;
    case 'contact':
      userAddr = getAssetUserContactAddress(username);
      break;
    case 'payment':
      userAddr = getAssetUserPaymentAddress(username);
      break;
    default:
      break;
  }

  var reqData = { userAddr: userAddr };
  $.post(/APIURL_CLIENT/, reqData, res => {
    if (res.error) {
      console.log('There is some issue in validator for fetching tabs');
    } else {
      const data = JSON.parse(res.body).data;
      cb(
        data.reduce(
          (processed, datum) => {
            if (datum.data !== '') {
              const parsed = JSON.parse(atob(datum.data));
              processed.tabData.push(parsed);
            }
            return processed;
          },
          { tabData: [] }
        )
      );
    }
  });
};

const getServerDate = callback => {
  $.getJSON('api/', function(data) {
    var serverDate = new Date(data);
    callback(serverDate.getTime());
  });
};

// Submit signed Transaction to validator
const submitUpdate = (payloadArr, privateKey, cb) => {
  var reqData = {
    payloadArr: payloadArr,
    privateKey: privateKey
  };
  $.post(/APIURL_CLIENT_SUBMIT/, reqData, res => {
    if (res.error) {
      alert('There is some issue in batch submit. Please try after sometime');
      cb(null);
    } else {
      let body = JSON.parse(res.body);
      console.log(body);
      cb(body);
    }
  });
};

/* websocket */
let ws = new WebSocket(WEBSOCKET_URL);
ws.onopen = () => {
  ws.send(
    JSON.stringify({
      action: 'subscribe',
      address_prefixes: [PREFIX]
    })
  );
};

module.exports = {
  submitUpdate,
  ws,
  getSpecificPoster,
  getStateTabs,
  getServerDate
};
