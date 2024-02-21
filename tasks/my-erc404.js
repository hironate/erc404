/* eslint-disable no-undef */
require('dotenv').config();
const { CONTRACT_NAMES } = require('../utils/constants');
const {
  readContract,
  writeContract,
  writeABI,
  readABI,
} = require('../utils/io');

const tokenSupplierAddress = '';

task('deploy:boxheds', 'Deploy Boxheds Contract', async (_, { ethers }) => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const myErc404 = await ethers.deployContract(CONTRACT_NAMES.BOXHEDS, [
    // owner address
    signer.address,
    // token supplier address
    tokenSupplierAddress,
  ]);

  await myErc404.waitForDeployment();

  console.info(`Contract deployed at ${myErc404.target}`);

  writeContract(CONTRACT_NAMES.BOXHEDS, myErc404.target, signer.address, []);
});

task('verify:boxheds', 'Verify Boxheds Contract', async (_, { run }) => {
  const myErc404 = readContract(CONTRACT_NAMES.BOXHEDS);
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  await run('verify:verify', {
    address: myErc404.address,
    constructorArguments: [
      // owner address
      signer.address,
      // token supplier address
      tokenSupplierAddress,
    ],
  });
});

task(
  'whitelist-owner:boxheds',
  'Whitelists the owner of the Boxheds Contract',
  async (_, { ethers }) => {
    const myErc404 = readContract(CONTRACT_NAMES.BOXHEDS);
    const abi = readABI(CONTRACT_NAMES.BOXHEDS);

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const contract = new ethers.Contract(myErc404.address, abi, signer);

    const tx = await contract.setWhitelist(tokenSupplierAddress, true);
    await tx.wait();

    console.info(`${tokenSupplierAddress} whitelisted`);
  },
);

task(
  'set-token-uri',
  'Sets the Base token URI in the contract',
  async (_, { ethers }) => {
    const myErc404 = readContract(CONTRACT_NAMES.BOXHEDS);
    const abi = readABI(CONTRACT_NAMES.BOXHEDS);

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const contract = new ethers.Contract(myErc404.address, abi, signer);

    const dataURI = '';

    const tx = await contract.setTokenURI(dataURI);
    await tx.wait();

    console.info(`BaseTokenURI has been set successfully!`);
  },
);

task('abi:boxheds', 'Export Boxheds contract ABI', async () => {
  writeABI('Boxheds.sol/Boxheds.json', CONTRACT_NAMES.BOXHEDS);
});
