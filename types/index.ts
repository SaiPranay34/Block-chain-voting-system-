export interface User {
  id: string;
  name: string;
  voterId: string;
  hasVoted: boolean;
  isAdmin?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  imageUrl: string;
}

export interface Vote {
  id: string;
  candidateId: string;
  timestamp: number;
  voterId: string;
  blockHash: string;
}

export interface Block {
  index: number;
  timestamp: number;
  votes: Vote[];
  previousHash: string;
  hash: string;
  nonce: number;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  candidates: Candidate[];
  status: 'upcoming' | 'active' | 'completed';
}