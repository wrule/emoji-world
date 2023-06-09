import { ethers } from "hardhat";

async function main() {
  const HelloFactory = await ethers.getContractFactory("Hello");
  const Hello = await HelloFactory.deploy();
  await Hello.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
