/* eslint-disable no-undef */
require('dotenv').config();
const { CONTRACT_NAMES } = require('../utils/constants');
const {
  readContract,
  writeContract,
  writeABI,
  readABI,
} = require('../utils/io');

task(
  'deploy:gradient-circle',
  'Deploy GradientCircle Contract',
  async (_, { ethers }) => {
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const gradientCircle = await ethers.deployContract(
      CONTRACT_NAMES.GRADIENT_CIRCLE,
      [
        // owner address
        signer.address,
        // token supplier address
        signer.address,
      ],
    );

    await gradientCircle.waitForDeployment();

    console.info(`Contract deployed at ${gradientCircle.target}`);

    writeContract(
      CONTRACT_NAMES.GRADIENT_CIRCLE,
      gradientCircle.target,
      signer.address,
      [signer.address, signer.address],
    );
  },
);

task(
  'verify:gradient-circle',
  'Verify GradientCircle Contract',
  async (_, { run }) => {
    const gradientCircle = readContract(CONTRACT_NAMES.GRADIENT_CIRCLE);
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    await run('verify:verify', {
      address: gradientCircle.address,
      constructorArguments: [
        // owner address
        signer.address,
        // token supplier address
        signer.address,
      ],
    });
  },
);

task(
  'whitelist-owner:gradient-circle',
  'Whitelists the owner of the GradientCircle Contract',
  async (_, { ethers }) => {
    const gradientCircle = readContract(CONTRACT_NAMES.GRADIENT_CIRCLE);
    const abi = readABI(CONTRACT_NAMES.GRADIENT_CIRCLE);

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const contract = new ethers.Contract(gradientCircle.address, abi, signer);

    const tx = await contract.setWhitelist(signer.address, true);
    await tx.wait();

    console.info(`${signer.address} whitelisted`);
  },
);

task(
  'set-token-uri',
  'Sets the Base token URI in the contract',
  async (_, { ethers }) => {
    const gradientCircle = readContract(CONTRACT_NAMES.GRADIENT_CIRCLE);
    const abi = readABI(CONTRACT_NAMES.GRADIENT_CIRCLE);

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const contract = new ethers.Contract(gradientCircle.address, abi, signer);

    const dataURI = '';

    const tx = await contract.setTokenURI(dataURI);
    await tx.wait();

    console.info(`BaseTokenURI has been set successfully!`);
  },
);

task('abi:gradient-circle', 'Export GradientCircle contract ABI', async () => {
  writeABI(
    'GradientCircle.sol/GradientCircle.json',
    CONTRACT_NAMES.GRADIENT_CIRCLE,
  );
});
