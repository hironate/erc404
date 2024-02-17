# ERC404

ERC-404 is a new experimental way of combining two existing standards in the cryptocurrency world: ERC-20 and ERC-721. It aims to allow for both regular token transactions (like ERC-20) and unique, non-fungible tokens (like ERC-721) to work together smoothly.

To make this work, ERC-404 uses a method called "pathing." Pathing is a bit like fitting two things into one space by overlapping them. It's not perfect, but it tries to make sure everything fits without causing major problems.

If other systems want to work with ERC-404, they need to make sure they understand and follow these overlapping rules.

This version of ERC-404 tries to solve common problems and make it easier for different systems to work together. But because it's still new and hasn't been fully checked by experts, there might be issues that need to be fixed.

Overall, ERC-404 is an experiment that tries to combine two different cryptocurrency standards in a way that makes sense.

## Prerequisites

## Configuration

Ensure you have a `.env` file in the project root directory with the necessary environment variables. The available options are:

- `ACCOUNT_PRIVATE_KEY`: Specify the private key from which the contracts will be deployed
- `ALCHEMY_MAINNET_API_KEY`: Specify the alchemy mainnet api key
- `ALCHEMY_SEPOLIA_API_KEY`: Specify the alchemy sepolia api key
- `ALCHEMY_POLYGON_API_KEY`: Specify the alchemy polygon api key
- `ALCHEMY_MUMBAI_API_KEY`: Specify the alchemy polygon mumbai api key
- `ETHERSCAN_API_KEY`: Specify the etherscan api key for verifying contracts
- `POLYGONSCAN_API_KEY`: Specify the polygonscan api key for verifying contracts
- `DEPLOY_NETWORK`: Specify the network for deployment (e.g., `sepolia`, `polygonMumbai`, `polygon`, `mainnet`)
- `IMAGE_URL`: Specify the image url to be set in the Contract's DataURI

## Tasks

Before deploying and verifying the contract, don't forget to pass the owner address in the constructor parameters in the deploy and verify tasks.

##### Note: The deployer of the contract will be set as the owner.

```javascript
// deploy
const myErc404 = await ethers.deployContract(CONTRACT_NAMES.MY_ERC404, [
  '/* owner address */',
]);

// verify
await run('verify:verify', {
  address: myErc404.address,
  constructorArguments: ['/* owner address */'],
});
```

### `Copy .env file from .env.example`

```bash
cp .env.example .env`
```

Clean and compile contracts with below commands

```bash
npx hardhat clean
npx hardhat compile
```

### `deploy:my-erc404`

Deploys the MyERC404 contract to the specified network.

```bash
npx hardhat deploy:my-erc404 --network sepolia
npx hardhat deploy:my-erc404 --network mainnet
```

This task will deploy the `MyERC404` contract using the specified network and output the deployed contract address.

### `verify:my-erc404`

Verifies the MyERC404 contract on the specified network.

```bash
npx hardhat verify:my-erc404 --network sepolia
npx hardhat verify:my-erc404 --network mainnet
```

This task will verify the `MyERC404` contract on the specified network. It retrieves the contract address from the previously deployed contract and uses it for verification.

### `abi:my-erc404`

Exports the ABI for the MyERC404 contract.

```bash
npx hardhat abi:my-erc404
```

This task will export the ABI for the `MyERC404.sol` contract and save it as `MyERC404.json`.

### `whitelist-owner:erc404`

Whitelists the owner of the contract.

```bash
npx hardhat whitelist-owner:my-erc404 --network sepolia
npx hardhat whitelist-owner:my-erc404 --network mainnet
```

This task will whitelist the deployer/owner of the contract. Whitelisting will exempt them from token minting and burning during transfers

### `set-data-uri`

Sets the dataURI for the NFTs.

```bash
npx hardhat set-data-uri --network sepolia
npx hardhat set-data-uri --network mainnet
```

This task involves setting the `IMAGE_URL` from the .env file as the `dataURI` within the contract.
