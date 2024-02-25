/* eslint-disable no-undef */
require('dotenv').config();
const { CONTRACT_NAMES } = require('../utils/constants');
const {
  readContract,
  writeContract,
  writeABI,
  readABI,
} = require('../utils/io');

const tokenSupplierAddress = '0x58d2fCF0d8F83536b1A54E17FbF11b2baC9FA8c2';

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
        tokenSupplierAddress,
      ],
    );

    await gradientCircle.waitForDeployment();

    console.info(`Contract deployed at ${gradientCircle.target}`);

    writeContract(
      CONTRACT_NAMES.GRADIENT_CIRCLE,
      gradientCircle.target,
      signer.address,
      [],
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
        tokenSupplierAddress,
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

    const tx = await contract.setWhitelist(
      '0xF04f146d32b01ae80Fd4f9c5dC2D076690A97F24',
      true,
    );
    await tx.wait();

    console.info(`${tokenSupplierAddress} whitelisted`);
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
