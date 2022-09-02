const hre = require("hardhat");
// import the contract abi
const bankAppAbi = require("./abi/bankAppAbi");

async function main() {
  const signers = await hre.ethers.getSigners();
  const contractAddress = "0x6Ffc4BC5824Bb6206c902164DeFB922CC2D4Abc4";
  const account0 = signers[0].address;
  const account1 = "0x6E0F2AC847fa88cC144e7BAc0188c3E16ad61B96";
  //metamask address
  console.log("myAddress:", account0);
  //create an instance of our bankApp contract
  const bankAppContract = new hre.ethers.Contract(contractAddress, bankAppAbi, signers[0].provider);

  //register a new account
  console.log(
    "Register-Res:",
    await bankAppContract.connect(signers[0]).register(account1, 1234, "John", "A004edddf3", 0),{
      gasLimit: 6000000,
    },
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
