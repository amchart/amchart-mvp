'use strict';

const { createHash } = require('crypto');
// TODO: hard-coded module path is brittle.
const secp256k1 = require('./../Web/node_modules/secp256k1');

const { FAMILY } = require('../config');

const getAddress = (key, length = 64) => {
  return createHash('sha512')
    .update(key)
    .digest('hex')
    .slice(0, length);
};

const getAddressForKey = (key, length = 64) => {
  return createHash('sha512')
    .update(key)
    .digest()
    .slice(0, length);
};

const PREFIX = getAddress(FAMILY, 6);

const userAddr = '00';
const medicalAddr = '01';
const vitalsAddr = '02';
const appointmentsAddr = '03';
const labsAddr = '04';
const insuranceAddr = '05';
const contactAddr = '06';
const paymentAddr = '07';

const getAssetUserAddress = name => PREFIX + userAddr + getAddress(name, 62);
const getAssetUserMedicalAddress = name =>
  PREFIX + medicalAddr + getAddress(name, 62);
const getAssetUserVitalsAddress = name =>
  PREFIX + vitalsAddr + getAddress(name, 62);
const getAssetUserAppointmentsAddress = name =>
  PREFIX + appointmentsAddr + getAddress(name, 62);
const getAssetUserLabsAddress = name =>
  PREFIX + labsAddr + getAddress(name, 62);
const getAssetUserInsuranceAddress = name =>
  PREFIX + insuranceAddr + getAddress(name, 62);
const getAssetUserContactAddress = name =>
  PREFIX + contactAddr + getAddress(name, 62);
const getAssetUserPaymentAddress = name =>
  PREFIX + paymentAddr + getAddress(name, 62);

const _decodeBuffer = (buffer, format) => {
  if (buffer instanceof Buffer) return buffer;
  return Buffer.from(buffer, format);
};
const decodeHex = hex => _decodeBuffer(hex, 'hex');

/**
 * Generates a random 256-bit private key.
 *
 * @return {string} 256-bit private key represented as a 64-char hex string.
 */
const makePrivateKey = password => {
  let privateKey;

  do
    privateKey = getAddressForKey(password, 32); // Gennerate 32 bit sha512 password
  while (!secp256k1.privateKeyVerify(privateKey));

  return privateKey.toString('hex');
};
/**
 * Returns the safe to share public key for a 256-bit private key.
 *
 * @param {string|Buffer} privateKey - 256-bit private key encoded as either
 *      a hex string or raw binary Buffer.
 *
 * @return {string} Public key represented as a hex string.
 */
const getPublicKey = privateKey => {
  const privateBuffer = decodeHex(privateKey);

  const publicKey = secp256k1.publicKeyCreate(privateBuffer);
  return publicKey.toString('hex');
};

// Create new key-pair
const makeKeyPair = (publicKey, name, avatar) => {
  const privateKey = makePrivateKey(publicKey);

  let imageUrl = '';
  if (avatar && avatar.uri) {
    imageUrl = avatar.uri;
  }
  return {
    public: getPublicKey(privateKey),
    private: privateKey,
    name,
    imageUrl
  };
};

module.exports = {
  makeKeyPair,
  getPublicKey,
  decodeHex,
  PREFIX,
  getAssetUserAddress,
  getAssetUserMedicalAddress,
  getAssetUserVitalsAddress,
  getAssetUserAppointmentsAddress,
  getAssetUserLabsAddress,
  getAssetUserInsuranceAddress,
  getAssetUserContactAddress,
  getAssetUserPaymentAddress
};
