const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // 1. Deploy Togethers (escrow)
  const Togethers = await ethers.getContractFactory("Togethers");
  const togethers = await Togethers.deploy();
  await togethers.waitForDeployment();
  const togethersAddress = await togethers.getAddress();
  console.log("Togethers (escrow) deployed to:", togethersAddress);

  // 2. Deploy TogethersCoin
  const INITIAL_SUPPLY = 1_000_000; // 1,000,000 TGC
  const TogethersCoin = await ethers.getContractFactory("TogethersCoin");
  const togethersCoin = await TogethersCoin.deploy(INITIAL_SUPPLY);
  await togethersCoin.waitForDeployment();
  const togethersCoinAddress = await togethersCoin.getAddress();
  console.log("TogethersCoin deployed to:", togethersCoinAddress);

  // 3. Set Togethers as the escrow of TogethersCoin
  const tx = await togethersCoin.setEscrow(togethersAddress);
  await tx.wait();
  console.log("Escrow set to Togethers:", togethersAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
