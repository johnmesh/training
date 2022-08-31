const hre = require("hardhat");

async function main() {
  //body
  const signers = await hre.ethers.getSigners();
  //
  const account0 = signers[0].address;
  const BankApp = await hre.ethers.getContractFactory("BankApp");
  const bankApp = await BankApp.deploy("Loibon");
  await bankApp.deployed();

  await bankApp.register(account0, 1234, "John", "A004edddf3", 0);

  //login the user
  await bankApp.connect(signers[0]).login()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
