# Escrow Contract

## Description
The Escrow Contract is a Hardhat project designed to facilitate secure transactions between two parties. The contract acts as a trusted intermediary, holding funds until certain conditions are met. This is based upon the OpenZeppelin [escrow contract](https://github.com/binodnp/openzeppelin-solidity/blob/master/contracts/payment/escrow/Escrow.sol) but with third party authentication. 

## Escrow.sol Breakdown

### Functions:
- `setPassword(bytes32 password)`: Allows the third party to set an encrypted password.
- `holdingBank()`: Accepts and holds funds sent to the contract.
- `timeRanOut()`: Allows the owner to retrieve funds if the escrow period has ended without a successful transaction.
- `checkTimeLeft()`: Returns the time left before the escrow period ends.
- `successfulTransaction(string memory password)`: Allows the third party to release funds to the receiver upon successful password verification.

---

[View the detailed contract here](https://github.com/wjorgensen/Escrow-Contract/blob/main/contracts/Escrow.sol).

---
