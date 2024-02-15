/* eslint-disable no-undef */
const { CONTRACT_NAMES } = require('../utils/constants');
const { readContract, writeContract, writeABI } = require('../utils/io');

task(
  'deploy:mock-erc20',
  'Deploy MockERC20 Contract',
  async (_, { ethers }) => {
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const mockErc20 = await ethers.deployContract('MockERC20', []);

    await mockErc20.waitForDeployment();

    console.info(`Contract deployed at ${mockErc20.target}`);

    writeContract(
      CONTRACT_NAMES.MOCK_ERC20,
      mockErc20.target,
      signer.address,
      [],
    );
  },
);

task('verify:mock-erc20', 'Verify MockERC20 Contract', async (_, { run }) => {
  const mockErc20 = readContract(CONTRACT_NAMES.MOCK_ERC20);

  await run('verify:verify', {
    address: mockErc20.address,
    constructorArguments: [],
  });
});

task('abi:mock-erc20', 'Export MockERC20 contract ABI', async () => {
  writeABI('MockERC20.sol/MockERC20.json', CONTRACT_NAMES.MOCK_ERC20);
});
