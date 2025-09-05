import { User, Candidate, Election } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    voterId: 'VID-123456',
    hasVoted: false
  },
  {
    id: '2',
    name: 'Jane Smith',
    voterId: 'VID-789012',
    hasVoted: false
  },
  {
    id: '3',
    name: 'Admin User',
    voterId: 'ADMIN-001',
    hasVoted: false,
    isAdmin: true
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alexander Johnson',
    party: 'Progressive Party',
    description: 'Focused on environmental policies and social equality.',
    imageUrl: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Sophia Rodriguez',
    party: 'Liberty Alliance',
    description: 'Advocating for economic growth and individual freedoms.',
    imageUrl: 'https://images.pexels.com/photos/5553050/pexels-photo-5553050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Michael Chen',
    party: 'Unity Coalition',
    description: 'Building bridges across political divides with moderate policies.',
    imageUrl: 'https://images.pexels.com/photos/8427047/pexels-photo-8427047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const mockElection: Election = {
  id: '1',
  title: 'Presidential Election 2025',
  description: 'National election for selecting the next president of the country.',
  startDate: Date.now() - 1000 * 60 * 60 * 24, // Started 1 day ago
  endDate: Date.now() + 1000 * 60 * 60 * 24 * 6, // Ends in 6 days
  candidates: mockCandidates,
  status: 'active'
};

export const generateVoteId = (): string => {
  return uuidv4();
};