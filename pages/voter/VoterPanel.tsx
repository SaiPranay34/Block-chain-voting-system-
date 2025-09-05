import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivitySquare } from 'lucide-react';
import { toast } from 'react-toastify';
import PageTitle from '../../components/common/PageTitle';
import ConnectWallet from '../../components/wallet/ConnectWallet';
import CandidateCard from '../../components/voting/CandidateCard';
import { useAuthStore } from '../../store/authStore';
import { useElectionStore } from '../../store/electionStore';
import { useWalletStore } from '../../store/walletStore';

const VoterPanel = () => {
  const { user } = useAuthStore();
  const { isConnected } = useWalletStore();
  const { candidates, isElectionActive, fetchCandidates, isLoading } = useElectionStore();
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);
  
  useEffect(() => {
    if (user?.hasVoted) {
      setHasVoted(true);
    }
  }, [user]);
  
  const handleVoteSuccess = () => {
    setHasVoted(true);
    
    // Delay redirect to results page
    setTimeout(() => {
      toast.info("Redirecting to results page...");
      navigate('/results');
    }, 3000);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <PageTitle
        title="Cast Your Vote"
        subtitle="Select your preferred candidate and confirm your vote on the blockchain"
      />
      
      <div className="container mx-auto max-w-6xl">
        {!isConnected && (
          <div className="mb-8 max-w-md mx-auto">
            <ConnectWallet />
          </div>
        )}
        
        {hasVoted && (
          <div className="mb-8 card p-4 bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-emerald-800 font-medium">
              You have successfully cast your vote! Thank you for participating.
            </p>
          </div>
        )}
        
        {!isElectionActive && (
          <div className="mb-8 card p-4 bg-amber-50 border border-amber-200 text-center">
            <p className="text-amber-800 font-medium flex items-center justify-center gap-2">
              <ActivitySquare size={18} />
              Voting is currently closed
            </p>
          </div>
        )}
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading candidates...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isElectionActive={isElectionActive}
                onVoteSuccess={handleVoteSuccess}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterPanel;