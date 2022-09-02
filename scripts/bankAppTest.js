const hre = require("hardhat");
const abi = require("./abi/bankApp");

async function main() {
  const contractAddress = "0x6Ffc4BC5824Bb6206c902164DeFB922CC2D4Abc4";
  const signers = await hre.ethers.getSigners();

  const account0 = signers[0].address;

  const contract = new hre.ethers.Contract(contractAddress, abi, signers[0].provider);

  /*  console.log(
    "Register:",
    await contract.connect(signers[0]).register(account0, 1234, "John", "A004edddf3", 10),
  ); */

  // console.log("Login:", await contract.connect(signers[0]).login());

  console.log("Deposit:", await contract.connect(signers[0]).deposit(1000));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
