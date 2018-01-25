const { createHash } = require('crypto');
const secp256k1 = require('secp256k1');

const { createContext, CryptoFactory } = require('sawtooth-sdk/signing');
const context = createContext('secp256k1');

const { FAMILY, VERSION } = require('./../config');
const { PREFIX, getPublicKey, decodeHex } = require('./../common');

const cbor = require('cbor');

const { protobuf } = require('sawtooth-sdk');

const getBatchBytes = (payloadArr, privateKey) => {
  var transactionArr = [];
  const privateBuffer = {
    privateKeyBytes: decodeHex(privateKey)
  };
  const signer = new CryptoFactory(context).newSigner(privateBuffer);
  const publicKey = getPublicKey(privateKey);

  payloadArr.forEach(payload => {
    //const payloadBytes = cbor.encode(payload);
    const payloadBytes = Buffer.from(JSON.stringify(payload));
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      inputs: [PREFIX],
      outputs: [PREFIX],
      familyName: FAMILY,
      familyVersion: VERSION,
      signerPublicKey: publicKey,
      batcherPublicKey: publicKey,
      dependencies: [],
      payloadSha512: createHash('sha512')
        .update(payloadBytes)
        .digest('hex')
    }).finish();

    const signature = signer.sign(transactionHeaderBytes);
    const transaction = protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: payloadBytes
    });

    transactionArr.push(transaction);
  });

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: publicKey,
    transactionIds: transactionArr.map(txn => txn.headerSignature)
  }).finish();

  const signature = signer.sign(batchHeaderBytes);
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: signature,
    transactions: transactionArr
  });

  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
  }).finish();

  return batchListBytes;
};

module.exports = {
  getBatchBytes
};
