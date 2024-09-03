# Decentralized To-Do List App

This is a decentralized to-do list application built on the Ethereum blockchain using Solidity, Hardhat, and React.

## Features

- Add tasks to the blockchain.
- Toggle task completion status.
- Each user has their own list stored securely on the blockchain.

## Technologies Used

- **Solidity:** Smart contracts to manage the to-do list.
- **Hardhat:** Development environment for compiling, deploying, and testing smart contracts.
- **React:** Front-end framework to interact with the smart contracts.
- **Ethers.js:** Library to interact with the Ethereum blockchain.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/decentralized-todo-list.git

2. Install dependencies:
  ```bash
   cd decentralized-todo-list
  ```bash
   npm install
  ```bash
   cd client
  ```bash
   npm install

3. Start the Hardhat Node:
  ```bash
   npx hardhat node

4. Deploy the Contracts:
  ```bash
   npx hardhat run scripts/deploy.js --network localhost

5. Start the React App:
  ```bash
   cd client
  ```bash
   npm start


#Make sure to import your hardhar wallets into MetaMask along with your Local Network(check hardhat.config.js)
#This project is licensed under the MIT License.





