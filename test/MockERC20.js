const { expect } = require('chai');
const { ethers } = require('hardhat');
const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { deployContract } = require('./utils');
const { CONTRACT_NAMES } = require('../utils/constants');
const { tokenURIResponseData } = require('./data');

describe('Testing ERC404 Contract', async () => {
  const deployContractFixtures = async () => {
    const [owner, bob, maria] = await ethers.getSigners();

    // deploy contract
    const myERC404 = await deployContract(CONTRACT_NAMES.MY_ERC404, [
      owner.address,
    ]);

    await myERC404.setWhitelist(owner.address, true);

    return { owner, bob, maria, myERC404 };
  };

  it('Should set the correct dataURI', async () => {
    const dataURI = 'https://example.com/data/';

    const { myERC404 } = await loadFixture(deployContractFixtures);

    await myERC404.setDataURI(dataURI);

    expect(await myERC404.dataURI()).to.equal(dataURI);
  });

  it('Should not let someone other than owner set the dataURI', async () => {
    const { myERC404, bob } = await loadFixture(deployContractFixtures);
    const dataURI = 'https://example.com/data/';

    await expect(
      myERC404.connect(bob).setDataURI(dataURI),
    ).to.be.revertedWithCustomError(myERC404, 'Unauthorized()');
  });

  it('Should set the correct name and symbol', async () => {
    const { myERC404 } = await loadFixture(deployContractFixtures);
    const newName = 'New Name';
    const newSymbol = 'NN';

    await myERC404.setNameSymbol(newName, newSymbol);

    expect(await myERC404.name()).to.equal(newName);
    expect(await myERC404.symbol()).to.equal(newSymbol);
  });

  it('Should mint tokens to owner on deployment', async () => {
    const { myERC404, owner } = await loadFixture(deployContractFixtures);

    expect(await myERC404.balanceOf(owner.address)).to.equal(
      BigInt(10000 * 10 ** 18),
    );
  });

  it('Should return correct tokenURI if baseTokenURI is set', async () => {
    const { myERC404 } = await loadFixture(deployContractFixtures);

    const id = 1;
    const baseTokenURI = 'https://example.com/token/';
    const expectedTokenURI = baseTokenURI + id.toString();

    await myERC404.setTokenURI(baseTokenURI);

    expect(await myERC404.tokenURI(id)).to.equal(expectedTokenURI);
  });

  it('Should return metadata if baseTokenURI is not set', async () => {
    const { myERC404 } = await loadFixture(deployContractFixtures);
    const dataURI = 'https://example.com/data/';
    const id = 1;

    await myERC404.setDataURI(dataURI);

    const data = await myERC404.tokenURI(id);

    // Extract JSON string from the data
    const jsonString = data.substring(
      data.indexOf('{'),
      data.lastIndexOf('}') + 1,
    );

    // Parse the JSON string
    const parsedData = JSON.parse(jsonString);

    expect(parsedData).to.be.eql(tokenURIResponseData());
  });

  it('Should transfer tokens successfully', async () => {
    const { myERC404, owner, bob } = await loadFixture(deployContractFixtures);
    const amount = BigInt(1 * 10 ** 18);
    await myERC404.transfer(bob.address, amount);

    expect(await myERC404.balanceOf(owner.address)).to.equal(
      BigInt((await myERC404.totalSupply()) - amount),
    );
    expect(await myERC404.balanceOf(bob.address)).to.equal(amount);

    // mint token of Id #1
    expect(await myERC404.ownerOf(1)).to.be.equal(bob.address);
  });

  it('Should emit ERC20Transfer event when tokens are transferred successfully', async () => {
    const { myERC404, owner, bob } = await loadFixture(deployContractFixtures);
    const amount = BigInt(1 * 10 ** 18);
    await expect(myERC404.transfer(bob.address, amount))
      .to.emit(myERC404, 'ERC20Transfer')
      .withArgs(owner.address, bob.address, amount);
  });

  it('Should emit Transfer event when mint is called upon transfer', async () => {
    const { myERC404, bob } = await loadFixture(deployContractFixtures);
    const amount = BigInt(1 * 10 ** 18);
    await expect(myERC404.transfer(bob.address, amount))
      .to.emit(myERC404, 'Transfer')
      .withArgs(ethers.ZeroAddress, bob.address, 1);
  });

  it('Should revert when transferring tokens to Zero Address', async () => {
    const { myERC404 } = await loadFixture(deployContractFixtures);
    const amount = BigInt(1 * 10 ** 18);
    await expect(
      myERC404.transfer(ethers.ZeroAddress, amount),
    ).to.be.revertedWithCustomError(myERC404, 'InvalidRecipient');
  });

  it('Should revert with panic when transferring tokens without approval', async () => {
    const { myERC404, owner, bob } = await loadFixture(deployContractFixtures);
    const amount = BigInt(1 * 10 ** 18);

    await expect(
      myERC404.transferFrom(owner.address, bob.address, amount),
    ).to.be.revertedWithPanic('0x11');
  });

  it('Should approve and transfer tokens correctly', async () => {
    const { myERC404, owner, bob } = await loadFixture(deployContractFixtures);
    const amount = BigInt(1 * 10 ** 18);
    await myERC404.approve(owner.address, amount);

    expect(await myERC404.allowance(owner.address, owner.address)).to.equal(
      amount,
    );

    await myERC404
      .connect(owner)
      .transferFrom(owner.address, bob.address, amount);

    expect(await myERC404.balanceOf(owner.address)).to.equal(
      BigInt((await myERC404.totalSupply()) - amount),
    );
    expect(await myERC404.balanceOf(bob.address)).to.equal(amount);

    // mint token of Id #1
    expect(await myERC404.ownerOf(1)).to.be.equal(bob.address);
  });
});
