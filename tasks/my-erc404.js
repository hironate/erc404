/* eslint-disable no-undef */
require('dotenv').config();
const { CONTRACT_NAMES } = require('../utils/constants');
const {
  readContract,
  writeContract,
  writeABI,
  readABI,
} = require('../utils/io');

task('deploy:my-erc404', 'Deploy MyERC404 Contract', async (_, { ethers }) => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const myErc404 = await ethers.deployContract(CONTRACT_NAMES.MY_ERC404, [
    // owner address
    signer.address,
  ]);

  await myErc404.waitForDeployment();

  console.info(`Contract deployed at ${myErc404.target}`);

  writeContract(CONTRACT_NAMES.MY_ERC404, myErc404.target, signer.address, []);
});

task('verify:my-erc404', 'Verify MyERC404 Contract', async (_, { run }) => {
  const myErc404 = readContract(CONTRACT_NAMES.MY_ERC404);
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  await run('verify:verify', {
    address: myErc404.address,
    constructorArguments: [
      // owner address
      signer.address,
    ],
  });
});

task(
  'whitelist-owner:my-erc404',
  'Whitelists the owner of the MyERC404 Contract',
  async (_, { ethers }) => {
    const myErc404 = readContract(CONTRACT_NAMES.MY_ERC404);
    const abi = readABI(CONTRACT_NAMES.MY_ERC404);

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const contract = new ethers.Contract(myErc404.address, abi, signer);

    const tx = await contract.setWhitelist(signer.address, true);
    await tx.wait();

    console.info(`${signer.address} whitelisted`);
  },
);

task(
  'set-data-uri',
  'Sets the DataURI in the contract',
  async (_, { ethers }) => {
    const myErc404 = readContract(CONTRACT_NAMES.MY_ERC404);
    const abi = readABI(CONTRACT_NAMES.MY_ERC404);

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const contract = new ethers.Contract(myErc404.address, abi, signer);

    const dataURI = process.env.IMAGE_URL;

    const tx = await contract.setDataURI(dataURI);
    await tx.wait();

    console.info(`DataURI has been set successfully!`);
  },
);

task('abi:my-erc404', 'Export MyERC404 contract ABI', async () => {
  writeABI('MyERC404.sol/MyERC404.json', CONTRACT_NAMES.MY_ERC404);
});
