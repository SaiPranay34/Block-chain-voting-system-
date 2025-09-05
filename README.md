# BlockVote - Blockchain-Based Secure Voting System

A secure, transparent, and tamper-proof voting system using blockchain technology, ensuring anonymity, voter authentication, and real-time result visibility through an admin dashboard.

## Features

- **Secure Voter Authentication**: Login using Voter ID and connect to MetaMask wallet
- **Blockchain Voting**: Cast votes securely on the blockchain with one-vote-per-voter enforcement
- **Real-time Results**: View election results as they happen
- **Admin Dashboard**: Manage elections, view statistics, and export results
- **Smart Contract Integration**: All votes are recorded on the blockchain for maximum security and transparency

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Blockchain**: Solidity, Hardhat, MetaMask
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js
- MetaMask browser extension
- Hardhat (for local blockchain development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blockvote.git
   cd blockvote
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile smart contracts:
   ```
   npm run compile
   ```

4. Start a local blockchain (in a separate terminal):
   ```
   npx hardhat node
   ```

5. Deploy smart contracts to the local blockchain:
   ```
   npm run deploy-local
   ```

6. Start the development server:
   ```
   npm run dev
   ```

## Usage

### Voter Flow

1. Login with your Voter ID
2. Connect your MetaMask wallet
3. View the list of candidates
4. Cast your vote (one vote per voter)
5. View real-time results

### Admin Flow

1. Login with admin credentials
2. View vote counts and statistics in real-time
3. Open or close the election
4. Export results as needed

## Demo Credentials

For testing purposes, you can use any Voter ID and password for voter login, and any Admin ID and password for admin login.

## Smart Contract

The VotingSystem.sol smart contract handles:

- Adding candidates
- Casting votes
- Tracking who has voted
- Enabling/disabling the election
- Retrieving election results

## License

This project is licensed under the MIT License.