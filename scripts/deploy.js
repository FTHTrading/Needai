const { ethers } = require("hardhat");

async function main() {
  const AIAgent = await ethers.getContractFactory("AIAgent");
  const aiAgent = await AIAgent.deploy();

  await aiAgent.deployed();

  console.log("AIAgent deployed to:", aiAgent.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});