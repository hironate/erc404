# hardhat-solidity-multichain-boilerplate

This repository is a boilerplate for smart contract development which contains Hardhat tasks for deploying, verifying, and exporting the ABI for the contract.

## Prerequisites

Before running the tasks, make sure you have the following:

- Node.js and npm installed
- install dependencies (`npm install`)

## Benifits of using this boilerplate

- `Time Saving`: Boilerplate code provides a starting point, reducing the time needed to set up a new project. Developers can focus more on writing their custom code rather than configuring the project structure.
- `Consistency`: A standardized boilerplate ensures consistency across projects. This consistency can lead to easier maintenance and collaboration among team members.
- `Ease of Use`: With a boilerplate, developers can quickly get up to speed on a new project without needing to understand every detail of the underlying framework. This lowers the barrier to entry for new team members or contributors.
- `Customization`: While providing a starting point, boilerplates are often designed to be easily customizable. Developers can modify the boilerplate to fit the specific requirements of their project without reinventing the wheel.

Overall, using a boilerplate for Hardhat can streamline the development process, improve code quality, and enhance collaboration among team members.

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

## Tasks

### `deploy:mock-erc20`

Deploys the MockERC20 contract to the specified network.

```bash
npx hardhat deploy:mock-erc20 --network sepolia
npx hardhat deploy:mock-erc20 --network mainnet
```

This task will deploy the `MockERC20` contract using the specified network and output the deployed contract address.

### `verify:mock-erc20`

Verifies the MockERC20 contract on the specified network.

```bash
npx hardhat verify:mock-erc20 --network sepolia
npx hardhat verify:mock-erc20 --network mainnet
```

This task will verify the `MockERC20` contract on the specified network. It retrieves the contract address from the previously deployed contract and uses it for verification.

### `abi:mock-erc20`

Exports the ABI for the MockERC20 contract.

```bash
npx hardhat abi:mock-erc20
```

This task will export the ABI for the `MockERC20.sol` contract and save it as `MockERC20.json`.
