const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function() {
  let Escrow, escrow, owner, depositor, beneficiary, other;

  beforeEach(async function() {
    // Get the ContractFactory and Signers here
    Escrow = await ethers.getContractFactory("Escrow");
    [owner, depositor, beneficiary, other] = await ethers.getSigners();

    // Deploy the contract
    escrow = await Escrow.deploy(beneficiary.address);
    await escrow.deployed();
  });

  describe("Deployment", function() {
    it("Should set the right owner", async function() {
      expect(await escrow.owner()).to.equal(owner.address);
    });

    it("Should set the right beneficiary", async function() {
      expect(await escrow.beneficiary()).to.equal(beneficiary.address);
    });
  });

  describe("Deposit", function() {
    it("Allows a user to deposit funds", async function() {
      const depositAmount = ethers.utils.parseEther("1");
      await escrow.connect(depositor).deposit({ value: depositAmount });
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(depositAmount);
    });
  });

  describe("Withdrawal", function() {
    it("Allows the beneficiary to withdraw after release time", async function() {
      const depositAmount = ethers.utils.parseEther("1");
      await escrow.connect(depositor).deposit({ value: depositAmount });

      await ethers.provider.send("evm_increaseTime", [/* release time in seconds */]);
      await ethers.provider.send("evm_mine");

      await escrow.connect(beneficiary).withdraw();
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(0);
    });
  });

  describe("Revert", function() {
    it("Reverts unauthorized actions", async function() {
      await expect(escrow.connect(other).withdraw()).to.be.revertedWith("Not authorized");
    });
  });
});

