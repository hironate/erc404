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

## Uniswap V3

Use the below as guidelines on how to prepare for and deploy to a Uniswap V3 pool:

To predict the address of your Uniswap V3 Pool, use the following simulator: [https://dashboard.tenderly.co/shared/simulation/92dadba3-92c3-46a2-9ccc-c793cac6c33d](https://dashboard.tenderly.co/shared/simulation/92dadba3-92c3-46a2-9ccc-c793cac6c33d).

To use:

1. Click Re-Simulate in the top right corner.
2. Update the simulation parameters: `tokenA` (your token address), `tokenB` (typically WETH, or `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`), and set the fee tier to either 500, 3000 (for 0.3%), or 10000 (for 1%).
3. Run Simulate, and then expand the Input/Output section. The output on the right column will show the derived pool address.

## Useful Deployment Addresses

```
WETH: 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

# Uniswap v2
UniswapV2Router02: 0x7a250d5630b4cf539739df2c5dacb4c659f2488d
UniswapV2Factory: 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f

# Uniswap v3
UniswapV3Factory: 0x1F98431c8aD98523631AE4a59f267346ea31F984
UniversalRouter: 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD
UniversalRouter 2: 0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B
SwapRouter: 0xE592427A0AEce92De3Edee1F18E0157C05861564
SwapRouter02: 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45
NonfungiblePositionManager: 0xc36442b4a4522e871399cd717abdd847ab11fe88

```

# Other Chains

[https://github.com/Uniswap/sdk-core/blob/5365ae4cd021ab53b94b0879ec6ceb6ad3ebdce9/src/addresses.ts](https://github.com/Uniswap/sdk-core/blob/5365ae4cd021ab53b94b0879ec6ceb6ad3ebdce9/src/addresses.ts)

## License

This software is released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
