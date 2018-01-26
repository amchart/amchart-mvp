pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/token/DetailedERC20.sol';

contract PoCToken is StandardToken, DetailedERC20 {

  function PoCToken() DetailedERC20("AMSYS Token", "AMST", 0) public {
    getTokens();
  }

  /**
   * @dev Function to create tokens
   * @return A boolean that indicates if the operation was successful.
   */
  function getTokens() public returns (bool) {
    address _to = msg.sender;
    uint _amount = 1000;
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Transfer(address(0), _to, _amount);
    return true;
  }

}