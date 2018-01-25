'use strict';

/* server config urls */
const VALIDATOR_URL = process.env.VALIDATOR_URL || 'tcp://192.168.99.100:4004';

/* client config urls */
const API_URL = process.env.API_URL || 'http://192.168.99.100:8080';
const WEBSOCKET_URL =
  process.env.WEBSOCKET_URL || 'ws://192.168.99.100:8080/subscriptions';

/* per day token charge */
const ONE_DAY_TOKEN_CHARGE = process.env.ONE_DAY_TOKEN_CHARGE || 10;

const FAMILY = 'AmsysBC';
const VERSION = '1.0';

module.exports = {
  WEBSOCKET_URL,
  API_URL,
  ONE_DAY_TOKEN_CHARGE,
  VALIDATOR_URL,
  FAMILY,
  VERSION
};
