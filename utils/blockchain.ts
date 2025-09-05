import { Vote, Block } from '../types';
import CryptoJS from 'crypto-js';

export class Blockchain {
  chain: Block[];
  pendingVotes: Vote[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingVotes = [];
    this.difficulty = 2;
  }

  createGenesisBlock(): Block {
    return {
      index: 0,
      timestamp: Date.now(),
      votes: [],
      previousHash: '0',
      hash: '0',
      nonce: 0
    };
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addVote(vote: Vote): void {
    this.pendingVotes.push(vote);
  }

  minePendingVotes(): void {
    const block = this.createNewBlock();
    this.chain.push(block);
    this.pendingVotes = [];
  }

  createNewBlock(): Block {
    const block: Block = {
      index: this.chain.length,
      timestamp: Date.now(),
      votes: this.pendingVotes,
      previousHash: this.getLatestBlock().hash,
      hash: '',
      nonce: 0
    };

    block.hash = this.calculateHash(block);
    return block;
  }

  calculateHash(block: Block): string {
    return CryptoJS.SHA256(
      block.index +
      block.previousHash +
      block.timestamp +
      JSON.stringify(block.votes) +
      block.nonce
    ).toString();
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getAllVotes(): Vote[] {
    return this.chain.reduce((votes, block) => {
      return [...votes, ...block.votes];
    }, [] as Vote[]);
  }

  verifyVote(voteId: string): { isValid: boolean; blockIndex?: number } {
    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i];
      const vote = block.votes.find(v => v.id === voteId);
      
      if (vote) {
        return { isValid: true, blockIndex: i };
      }
    }
    return { isValid: false };
  }
}

export const blockchainInstance = new Blockchain();