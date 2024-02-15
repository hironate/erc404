const { expect } = require('chai');
const { ethers } = require('hardhat');
const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { deployContract } = require('./utils');

describe('Testing ERC20 Contract', async () => {
  const deployContractFixtures = async () => {
    const [alice, bob, maria] = await ethers.getSigners();

    // deploy contract
    const mockERC20 = await deployContract('MockERC20');

    return { alice, bob, maria, mockERC20 };
  };

  it('should supply tokens to the Owner', async () => {
    const { mockERC20, alice } = await loadFixture(deployContractFixtures);

    expect(await mockERC20.balanceOf(alice.address)).to.equal(1000000);
  });

  it('should return total supply', async () => {
    const { mockERC20 } = await loadFixture(deployContractFixtures);

    expect(await mockERC20.totalSupply()).to.equal(1000000);
  });

  describe('Transferring tokens', async () => {
    it('should transfer tokens successfully', async () => {
      const { alice, bob, mockERC20 } = await loadFixture(
        deployContractFixtures,
      );
      await mockERC20.connect(alice).transfer(bob.address, 10);
      const aliceBalance = parseInt(
        await mockERC20.balanceOf(alice.address),
        10,
      );
      const bobBalance = parseInt(await mockERC20.balanceOf(bob.address), 10);
      expect(aliceBalance).to.equal(999990);
      expect(bobBalance).to.equal(10);
    });

    it('should emit event after successful transfer', async () => {
      const { alice, bob, mockERC20 } = await loadFixture(
        deployContractFixtures,
      );

      await expect(mockERC20.connect(alice).transfer(bob.address, 10))
        .to.emit(mockERC20, 'Transfer')
        .withArgs(alice.address, bob.address, 10);
    });
  });

  describe('Giving approval for Token Transfer', async () => {
    it('should emit event after giving approval', async () => {
      const { alice, bob, mockERC20 } = await loadFixture(
        deployContractFixtures,
      );

      await expect(mockERC20.connect(alice).approve(bob.address, 10))
        .to.emit(mockERC20, 'Approval')
        .withArgs(alice.address, bob.address, 10);
    });

    it('should transfer token from allowance', async () => {
      const { alice, bob, maria, mockERC20 } = await loadFixture(
        deployContractFixtures,
      );
      await mockERC20.connect(alice).approve(bob.address, 10);

      await mockERC20
        .connect(bob)
        .transferFrom(alice.address, maria.address, 5);
      const aliceBalance = await mockERC20.balanceOf(alice.address);
      const mariaBalance = await mockERC20.balanceOf(maria.address);

      expect(aliceBalance).to.equal(999995);
      expect(mariaBalance).to.equal(5);
    });

    it('should return remaining allowance', async () => {
      const { alice, bob, maria, mockERC20 } = await loadFixture(
        deployContractFixtures,
      );
      await mockERC20.connect(alice).approve(bob.address, 10);

      await mockERC20
        .connect(bob)
        .transferFrom(alice.address, maria.address, 5);

      expect(await mockERC20.allowance(alice.address, bob.address)).to.equal(5);
    });

    it('should revert if not approved for transfer', async () => {
      const { alice, bob, maria, mockERC20 } = await loadFixture(
        deployContractFixtures,
      );

      await expect(
        mockERC20.connect(maria).transferFrom(alice.address, bob.address, 5),
      )
        .to.be.revertedWithCustomError(mockERC20, `ERC20InsufficientAllowance`)
        .withArgs(maria.address, 0, 5);
    });
  });
});
