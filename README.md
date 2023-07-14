# Criptodolar (UXD) 

Welcome to the official repository of Criptodolar, an open-source project aimed at creating a stablecoin on the LaChain blockchain platform. This stablecoin project, named Criptodolar and tagged as UXD, is issued by Ripio.

Criptodolar is an initiative to provide an inflation-resistant monetary system to Latin America. By creating a low-cost, easy-to-transfer, stablecoin, we aim to help protect Latin American populations from the financial instability caused by inflation. Our objective is to empower them to manage and grow their financial resources in a safe and predictable manner.

## Key Features

- USD Stablecoin with ticker UXD
- Issued on the LaChain blockchain
- Low-cost transfers and payments
- Protection against inflation

## Getting Started

To get started with the Criptodolar project, clone the repository and install the dependencies:

```bash
git clone https://github.com/ripio/criptodolar.git
cd criptodolar
npm install
```

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.14.0 or higher)

## Development

Criptodolar smart contracts are written in Solidity and the codebase uses Hardhat as a development environment. This allows for a streamlined and consistent workflow that encourages best practices when working with contract code.

To compile the smart contracts, use the Hardhat's `compile` task:

```bash
npx hardhat compile
```

## Testing

To run the tests:

```bash
npx hardhat test
```

## Deployment

After you've tested the contract, you can prepare it for deployment:

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## License

Criptodolar is released under the [MIT License](LICENSE).

## Contact

For any issues, suggestions, or general feedback, please feel free to contact the security team at security@ripio.com.

## Disclaimer

Please note that using UXD involves certain risks. This software is provided “as is”, without any representation or warranty of any kind. Always ensure you have understood the associated risks before using any financial tools.