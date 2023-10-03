// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Escrow is ReentrancyGuard {
    uint256 public balance;
    address public receiver;
    address private thirdParty;
    address public sender;
    address public owner;
    bytes32 private encrypted_password;
    uint256 public startBlock;
    uint256 public endBlock;

    event PasswordSet(string message);
    event Timeout(string message);
    event Transaction(string message);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyThirdParty() {
        require(msg.sender == thirdParty, "Only the trusted third party can call this function");
        _;
    }

    constructor(address _receiver, address _thirdParty, uint256 _endBlock) {
        require(_endBlock > block.timestamp, "End time must be in the future");
        receiver = _receiver;
        thirdParty = _thirdParty;
        owner = msg.sender;
        endBlock = _endBlock;
    }

    function setPassword(bytes32 password) public onlyThirdParty {
        require(password != bytes32(0), "Password cannot be empty");
        encrypted_password = password;
        emit PasswordSet("Password successfully set");
    }

    function holdingBank() public payable {
        balance += msg.value;
        sender = msg.sender;
    }

    function timeRanOut() public onlyOwner nonReentrant {
        require(block.timestamp >= endBlock, "Money is still in escrow until time runs out");
        require(balance > 0, "No money sent to the contract yet");

        payable(sender).transfer(balance);
        emit Timeout("Time ran out");
    }

    function checkTimeLeft() public view returns (uint256) {
        return (block.timestamp >= endBlock) ? 0 : endBlock - block.timestamp;
    }

    function successfulTransaction(string memory password) public onlyThirdParty nonReentrant {
        require(
            keccak256(abi.encodePacked(password)) == encrypted_password,
            "Password doesn't match"
        );

        payable(receiver).transfer(balance);
        emit Transaction("Password match, successful transaction");
    }
}
