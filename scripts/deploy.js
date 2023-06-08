const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CustomToken = await ethers.getContractFactory("CustomToken");
  const supply = ethers.utils.parseEther('100000');
  const customToken = await CustomToken.deploy("MyCustomToken", "MCT", supply);

  console.log("CustomToken deployed to:", customToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
