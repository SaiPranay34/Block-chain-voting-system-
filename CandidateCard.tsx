import { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { Candidate } from '../../store/electionStore';
import { useAuthStore } from '../../store/authStore';
import { useWalletStore } from '../../store/walletStore';

interface CandidateCardProps {
  candidate: Candidate;
  isElectionActive: boolean;
  onVoteSuccess: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  isElectionActive,
  onVoteSuccess
}) => {
  const { user, setVoted } = useAuthStore();
  const { isConnected } = useWalletStore();
  const [isVoting, setIsVoting] = useState(false);
  
  const castVote = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (user?.hasVoted) {
      toast.error("You have already voted");
      return;
    }
    
    if (!isElectionActive) {
      toast.error("Voting is currently closed");
      return;
    }
    
    try {
      setIsVoting(true);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user voting status
      setVoted();
      
      // Notify success
      toast.success(`Vote cast successfully for ${candidate.name}`);
      onVoteSuccess();
    } catch (error) {
      toast.error("Failed to cast vote. Please try again.");
      console.error(error);
    } finally {
      setIsVoting(false);
    }
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={candidate.imageUrl}
          alt={candidate.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold">{candidate.name}</h3>
        <p className="text-blue-800 font-medium">{candidate.party}</p>
        <p className="mt-2 text-slate-600 italic">"{candidate.slogan}"</p>
        
        <div className="mt-4">
          <button
            onClick={castVote}
            disabled={isVoting || user?.hasVoted || !isElectionActive || !isConnected}
            className={`w-full btn ${
              user?.hasVoted 
                ? 'bg-emerald-600 text-white cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {isVoting ? (
              <>
                <span className="animate-pulse">Processing...</span>
              </>
            ) : user?.hasVoted ? (
              <>
                <Check size={18} /> Voted
              </>
            ) : !isElectionActive ? (
              <>
                <AlertTriangle size={18} /> Voting Closed
              </>
            ) : (
              'Vote'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;