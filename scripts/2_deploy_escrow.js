const { ethers, upgrades } = require('hardhat');

async function getCurrentBlockNumber() {
  const blockNumber = await ethers.provider.getBlockNumber();
  return blockNumber;
}

async function main() {
  const Escrow = await ethers.getContractFactory('Escrow');
  console.log('Deploying Escrow...');

  const currentBlockNumber = await getCurrentBlockNumber();
  const endBlock = currentBlockNumber + 60;

  // Ensure that the constructor arguments match your contract's constructor
  const escrow = await upgrades.deployProxy(Escrow, [
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    endBlock,
  ]);

  await escrow.deployed();
  console.log('Escrow deployed to:', escrow.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });