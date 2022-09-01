const hre = require("hardhat");

async function main() {
  //deployment scripts
  const BankApp = await hre.ethers.getContractFactory("BankApp");
  const bankApp = await BankApp.deploy("Loibon");
  await bankApp.deployed();

  console.log(`bankApp has been deployed to ${bankApp.address} address`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
