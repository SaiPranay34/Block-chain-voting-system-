import { ethers } from 'ethers';
import VotingSystemABI from '../artifacts/contracts/VotingSystem.sol/VotingSystem.json';

// Contract configuration - in a real app, this would be from environment vars
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Local deployment address

export function getContractInstance(provider: any) {
  if (!provider) return null;
  
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      VotingSystemABI.abi,
      signer
    );
    return contract;
  } catch (error) {
    console.error("Error creating contract instance:", error);
    return null;
  }
}

export const formatWalletAddress = (address: string | null | undefined) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};