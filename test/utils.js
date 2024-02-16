const { ethers } = require('hardhat');

const deployContract = async (contractName, args = []) => {
  const contract = await ethers.deployContract(contractName, args);
  await contract.waitForDeployment();

  return contract;
};

module.exports = { deployContract };
