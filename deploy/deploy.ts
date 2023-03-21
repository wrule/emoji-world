import * as dotenv from "dotenv";
dotenv.config();
import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// Get private key from the environment variable
const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "";
if (!PRIVATE_KEY) {
  throw new Error("Please set ZKS_PRIVATE_KEY in the environment variables.");
}

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  const contractName = "Emoji";
  console.log(`开始部署 ${contractName} 合约...`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact(contractName);
  const args = [] as any[];

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, args);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`部署预计花费 ${parsedFee} ETH`);

  const contract = await deployer.deploy(artifact, args);

  //obtain the Constructor Arguments
  console.log("构造函数参数: " + contract.interface.encodeDeploy(args));

  // Show the contract info.
  console.log(`${artifact.contractName} 已经部署在 ${contract.address}`);
}

