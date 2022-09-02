const hre = require("hardhat");
// import the contract abi
const bankAppAbi = require("./abi/bankAppAbi");

async function main() {
  const signers = await hre.ethers.getSigners();
  const contractAddress = "0x6Ffc4BC5824Bb6206c902164DeFB922CC2D4Abc4";
  const account0 = signers[0].address;
  //metamask address
  console.log("myAddress:", account0);
  //create an instance of our bankApp contract
  const bankAppContract = new hre.ethers.Contract(contractAddress, bankAppAbi, signers[0].provider);

  //register a new account
  console.log("Login-Res:", await bankAppContract.connect(signers[0]).login());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
