import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Blockchain } from '../utils/blockchain';
import { Vote, Candidate, User } from '../types';
import { mockCandidates, generateVoteId } from '../utils/mockData';
import CryptoJS from 'crypto-js';

interface VotingContextType {
  blockchain: Blockchain;
  candidates: Candidate[];
  castVote: (user: User, candidateId: string) => Vote | null;
  verifyVote: (voteId: string) => { isValid: boolean; blockIndex?: number };
  getVoteCounts: () => Record<string, number>;
  hasUserVoted: (userId: string) => boolean;
  votes: Vote[];
}

const blockchain = new Blockchain();

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [votedUsers, setVotedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    setVotes(blockchain.getAllVotes());
  }, []);

  const castVote = (user: User, candidateId: string): Vote | null => {
    if (votedUsers.has(user.id)) {
      return null;
    }

    // Create new vote
    const vote: Vote = {
      id: generateVoteId(),
      candidateId,
      timestamp: Date.now(),
      voterId: user.id,
      blockHash: CryptoJS.SHA256(user.id + candidateId + Date.now()).toString()
    };

    // Add vote to blockchain
    blockchain.addVote(vote);
    blockchain.minePendingVotes();

    // Update state
    setVotes(blockchain.getAllVotes());
    
    // Mark user as voted
    setVotedUsers(prev => {
      const updated = new Set(prev);
      updated.add(user.id);
      return updated;
    });

    return vote;
  };

  const verifyVote = (voteId: string) => {
    return blockchain.verifyVote(voteId);
  };

  const getVoteCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {};
    
    candidates.forEach(candidate => {
      counts[candidate.id] = 0;
    });

    blockchain.getAllVotes().forEach(vote => {
      if (counts[vote.candidateId] !== undefined) {
        counts[vote.candidateId]++;
      }
    });

    return counts;
  };

  const hasUserVoted = (userId: string): boolean => {
    return votedUsers.has(userId);
  };

  return (
    <VotingContext.Provider value={{ 
      blockchain, 
      candidates, 
      castVote, 
      verifyVote, 
      getVoteCounts, 
      hasUserVoted,
      votes
    }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = (): VotingContextType => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};