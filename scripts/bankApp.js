const hre = require("hardhat");

async function main() {
  //body

  const BankApp = await hre.ethers.getContractFactory("BankApp");
  const bankApp = await BankApp.deploy("Loibon");
  await bankApp.deployed();

  await bankApp.register(
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    1234,
    "John",
    "A004edddf3",
    0,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
