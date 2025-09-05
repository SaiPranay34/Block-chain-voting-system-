import { create } from 'zustand';

export interface Candidate {
  id: number;
  name: string;
  party: string;
  slogan: string;
  imageUrl: string;
  voteCount: number;
}

interface ElectionState {
  candidates: Candidate[];
  isLoading: boolean;
  isElectionActive: boolean;
  fetchCandidates: () => Promise<void>;
  toggleElectionStatus: () => void;
}

// Mock data for demonstration
const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Johnson",
    party: "Progressive Party",
    slogan: "Forward Together",
    imageUrl: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    voteCount: 87
  },
  {
    id: 2,
    name: "Sarah Williams",
    party: "Liberty Alliance",
    slogan: "Freedom and Prosperity",
    imageUrl: "https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    voteCount: 63
  },
  {
    id: 3,
    name: "Michael Chen",
    party: "People's Coalition",
    slogan: "Unity in Diversity",
    imageUrl: "https://images.pexels.com/photos/8133243/pexels-photo-8133243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    voteCount: 75
  }
];

export const useElectionStore = create<ElectionState>((set) => ({
  candidates: [],
  isLoading: false,
  isElectionActive: true,
  
  fetchCandidates: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ 
      candidates: mockCandidates,
      isLoading: false
    });
  },
  
  toggleElectionStatus: () => {
    set((state) => ({ isElectionActive: !state.isElectionActive }));
  }
}));