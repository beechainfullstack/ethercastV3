const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying EtherCast with account:", deployer.address);

  const EtherCast = await ethers.getContractFactory("EtherCast");
  const etherCast = await EtherCast.deploy();

  await etherCast.waitForDeployment();

  const address = await etherCast.getAddress();
  console.log("EtherCast deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});