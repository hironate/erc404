/* eslint-disable no-undef */
const { CONTRACT_NAMES } = require('../utils/constants');
const { readContract, writeContract, writeABI } = require('../utils/io');

task('deploy:my-token', 'Deploy MyToken Contract', async (_, { ethers }) => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const myToken = await ethers.deployContract(CONTRACT_NAMES.MY_TOKEN, [
    // owner address
    '0xE71BcAa29294A56c7aef3FB419831a6447Df749b',
  ]);

  await myToken.waitForDeployment();

  console.info(`Contract deployed at ${myToken.target}`);

  writeContract(CONTRACT_NAMES.MY_TOKEN, myToken.target, signer.address, []);
});

task('verify:my-token', 'Verify MyToken Contract', async (_, { run }) => {
  const myToken = readContract(CONTRACT_NAMES.MY_TOKEN);

  await run('verify:verify', {
    address: myToken.address,
    constructorArguments: [
      // owner address
      '0xE71BcAa29294A56c7aef3FB419831a6447Df749b',
    ],
  });
});

task('abi:my-token', 'Export MyToken contract ABI', async () => {
  writeABI('MyToken.sol/MyToken.json', CONTRACT_NAMES.MY_TOKEN);
});
