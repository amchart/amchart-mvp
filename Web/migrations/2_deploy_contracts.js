
var Token = artifacts.require("./PoCToken.sol");
var Payment = artifacts.require("./Payment.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Token).then(() => deployer.deploy(Payment, Token.address, "0x1"));
};
