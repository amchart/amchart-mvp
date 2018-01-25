'use strict';

const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const {
  InvalidTransaction,
  InternalError
} = require('sawtooth-sdk/processor/exceptions');
const { TransactionHeader } = require('sawtooth-sdk/protobuf');

const { FAMILY, VERSION } = require('./../config');
const { Transaction } = require('./models');

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
} = require('./../common');

const encode = obj => Buffer.from(JSON.stringify(obj, Object.keys(obj).sort()));
const decode = buf => JSON.parse(buf.toString());

const toInternalError = err => {
  let message = err.message ? err.message : err;
  throw new InternalError(message);
};

const createAsset = (txnModel, state) => {
  if (!txnModel.isValid()) {
    throw new InvalidTransaction(txnModel.errors[0]);
  }
  const { asset, owner, username, isMessage, time } = txnModel.attrs;
  const address = getAssetUserAddress(username);
  return state.getState([address]).then(entries => {
    var isSet = true;
    var assetAddress = '';
    switch (isMessage) {
      case 'user':
        const entry = entries[address];
        if (entry && entry.length > 0) {
          throw new InvalidTransaction('User name already in use');
        } else {
          return state.setState({
            [address]: encode({ asset, owner, isMessage, username, time })
          });
        }
        isSet = false;
        break;
      case 'medical':
        assetAddress = getAssetUserMedicalAddress(username);
        break;
      case 'vitals':
        assetAddress = getAssetUserVitalsAddress(username);
        break;
      case 'appointments':
        assetAddress = getAssetUserAppointmentsAddress(username);
        break;
      case 'labs':
        assetAddress = getAssetUserLabsAddress(username);
        break;
      case 'insurance':
        assetAddress = getAssetUserInsuranceAddress(username);
        break;
      case 'contact':
        assetAddress = getAssetUserContactAddress(username);
        break;
      case 'payment':
        assetAddress = getAssetUserPaymentAddress(username);
        break;
      default:
        isSet = false;
        break;
    }

    if (isSet) {
      return state.setState({
        [assetAddress]: encode({ asset, owner, isMessage, username, time })
      });
    }
  });
};

// Handler for JSON encoded payloads
class JSONHandler extends TransactionHandler {
  constructor() {
    console.log('Initializing JSON handler for', FAMILY);
    super(FAMILY, [VERSION], [PREFIX]);
  }

  apply(txn, state) {
    // Parse the transaction header and payload
    //const header = TransactionHeader.decode(txn.header);
    //const signer = header.signerPubkey;

    const { action, asset, owner, username, isMessage, time } = JSON.parse(
      txn.payload
    );

    const txnModel = new Transaction({
      action,
      asset,
      owner,
      username,
      isMessage,
      time
    });
    console.info('Attempting to apply txn', txnModel);

    return createAsset(txnModel, state);
  }
}

module.exports = {
  JSONHandler,
  toInternalError
};
