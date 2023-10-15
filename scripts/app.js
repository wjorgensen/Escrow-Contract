const Web3 = require('web3');
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_thirdParty",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_endBlock",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "PasswordSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "Timeout",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "Transaction",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "balance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkTimeLeft",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "holdingBank",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "receiver",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sender",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "password",
          "type": "bytes32"
        }
      ],
      "name": "setPassword",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        }
      ],
      "name": "successfulTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "timeRanOut",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract's address

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Update with your Ethereum node URL

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to set the password using the third party
async function setPassword(password) {
  const accounts = await web3.eth.getAccounts();
  const thirdParty = accounts[1]; // Replace with the third party's address

  try {
    const result = await contract.methods.setPassword(web3.utils.fromAscii(password)).send({
      from: thirdParty,
    });
    console.log('Password set successfully:', result);
  } catch (error) {
    console.error('Error setting password:', error);
  }
}

// Function to check the time left in the contract
async function checkTimeLeft() {
  try {
    const timeLeft = await contract.methods.checkTimeLeft().call();
    console.log('Time left in seconds:', timeLeft);
  } catch (error) {
    console.error('Error checking time left:', error);
  }
}

// Function to trigger a successful transaction
async function successfulTransaction(password) {
  const accounts = await web3.eth.getAccounts();
  const thirdParty = accounts[0]; // Replace with the third party's address

  try {
    const result = await contract.methods.successfulTransaction(web3.utils.fromAscii(password)).send({
      from: thirdParty,
    });
    console.log('Transaction successful:', result);
  } catch (error) {
    console.error('Error executing transaction:', error);
  }
}

