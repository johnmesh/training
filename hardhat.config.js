require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {},
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/dmiU7o87IRNQMX8NNPaBPJUOzpWby1Wl",
      accounts: ["a91651f24d991c2244acb106a729178acd48d5cff0a4bc8a9cc345f4456b4464"],
      chainId: 80001,
    },
  },

  solidity: "0.8.4",
};
