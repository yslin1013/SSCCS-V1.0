pragma solidity ^0.4.18;
contract MyToken {
  /* This creates an array with all balances */
  mapping (address => uint256) public balanceOf;
  /* Initializes contract with initial supply tokens to
  the creator of the contract */
  function MyToken(uint256 initialSupply) public {
    // Give the creator all initial tokens        
    balanceOf[msg.sender] = initialSupply;
  }
  /* Send coins */
  function transfer(address _to, uint256 _value)
                    public returns (bool success) {
    // Check if the sender has enough
    require(balanceOf[msg.sender] >= _value);
    // Check for overflows
    require(balanceOf[_to] + _value >= balanceOf[_to]);
    // Subtract from the sender
    balanceOf[msg.sender] -= _value;
    // Add the same to the recipient
    balanceOf[_to] += _value;
    return true;
  }
}
