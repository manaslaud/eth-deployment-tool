pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
        address[] public players;


 
    constructor() public {
      manager=msg.sender;
    }
    function enter() public payable  {
      players.push(msg.sender);
    }
}