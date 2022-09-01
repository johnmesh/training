const hre = require("hardhat");

async function main() {
  //body
  const signers = await hre.ethers.getSigners();
  //
  const account0 = signers[0].address;
  const account1 = signers[1].address;
  const BankApp = await hre.ethers.getContractFactory("BankApp");
  const bankApp = await BankApp.deploy("Loibon");
  await bankApp.deployed();
  //account0
  await bankApp.register(account0, 1234, "John", "A004edddf3", 0);
  //account1
  await bankApp.register(account1, 4566, "Mesh", "A0293393eeee", 10);

  //login the user
  await bankApp.connect(signers[0]).login();

  //deposit
  await bankApp.connect(signers[0]).deposit(1000);
  //check account0 balance
  console.log(await bankApp.connect(signers[0]).balanceOf(account0));
  // transfer to account2
  await bankApp.connect(signers[0]).transfer(account1, 20);

  //check account 1 balance
  console.log(await bankApp.connect(signers[0]).balanceOf(account1));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
