// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// Deploy script for CustomToken smart contract on Hardhat

// Import Hardhat environment and Ethereum libraries
const { ethers } = require("hardhat");

async function main() {
  // Set up Ethereum wallet
  const [deployer] = await ethers.getSigners();

  // Grab MyCustomToken.sol
  console.log("Deploying the CustomToken contract with the account:", deployer.address);
  // Set up the CustomToken contract factory
  const CustomToken = await ethers.getContractFactory("CustomToken");
  const initialSupply = ethers.utils.parseEther("1000");
  // Deploy the CustomToken contract
  const customToken = await CustomToken.deploy("MyCustomToken", "MCT", initialSupply);

  await customToken.deployed();
  // display success and address
  console.log("CustomToken contract deployed to address:", customToken.address);
  
}


// Run the main function
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});