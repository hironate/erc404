/* eslint-disable no-undef */
const { CONTRACT_NAMES } = require('../utils/constants');
const { readContract, writeContract, writeABI } = require('../utils/io');

task('deploy:my-erc404', 'Deploy MyERC404 Contract', async (_, { ethers }) => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const myErc404 = await ethers.deployContract(CONTRACT_NAMES.MY_ERC404, [
    // owner address
    '0xCd45CB5F3f316900899A276E5b066e19B188ef58',
  ]);

  await myErc404.waitForDeployment();

  console.info(`Contract deployed at ${myErc404.target}`);

  writeContract(CONTRACT_NAMES.MY_ERC404, myErc404.target, signer.address, []);
});

task('verify:my-erc404', 'Verify MyERC404 Contract', async (_, { run }) => {
  const myErc404 = readContract(CONTRACT_NAMES.MY_ERC404);

  await run('verify:verify', {
    address: myErc404.address,
    constructorArguments: [
      // owner address
      '0xCd45CB5F3f316900899A276E5b066e19B188ef58',
    ],
  });
});

task('abi:my-erc404', 'Export MyERC404 contract ABI', async () => {
  writeABI('MyERC404.sol/MyERC404.json', CONTRACT_NAMES.MY_ERC404);
});
