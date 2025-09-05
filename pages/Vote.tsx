import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVoting } from '../contexts/VotingContext';
import CandidateCard from '../components/voting/CandidateCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { mockElection } from '../utils/mockData';

const Vote: React.FC = () => {
  const { currentUser } = useAuth();
  const { candidates, castVote, hasUserVoted } = useVoting();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setIsVoted(hasUserVoted(currentUser.id));
    }
  }, [currentUser, hasUserVoted]);

  const handleSelectCandidate = (candidateId: string) => {
    if (!isVoted) {
      setSelectedCandidate(candidateId);
    }
  };

  const handleSubmitVote = () => {
    if (!currentUser || !selectedCandidate) return;

    setIsSubmitting(true);

    // Simulate blockchain transaction time
    setTimeout(() => {
      const vote = castVote(currentUser, selectedCandidate);
      
      if (vote) {
        setVoteSuccess(true);
        setIsVoted(true);
      }
      
      setIsSubmitting(false);
    }, 2000);
  };

  const timeRemaining = mockElection.endDate - Date.now();
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{mockElection.title}</h1>
      
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-grow">
            <p className="text-gray-700">{mockElection.description}</p>
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                Election ends in {daysRemaining} days and {hoursRemaining} hours 
                ({new Date(mockElection.endDate).toLocaleDateString()})
              </span>
            </div>
          </div>
          
          {isVoted && voteSuccess && (
            <div className="mt-4 md:mt-0 flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-md">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Your vote has been recorded!</span>
            </div>
          )}
        </div>
      </Card>
      
      {/* Voting Instructions */}
      {!isVoted && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Voting Instructions</h2>
          <ol className="list-decimal pl-5 text-blue-700 space-y-1">
            <li>Select a candidate by clicking on their card</li>
            <li>Review your selection</li>
            <li>Click "Submit Vote" to cast your vote securely to the blockchain</li>
            <li>Wait for confirmation that your vote was recorded</li>
          </ol>
        </div>
      )}
      
      {/* Already Voted Message */}
      {isVoted && !voteSuccess && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-yellow-800 mb-1">You have already voted</h2>
            <p className="text-yellow-700">
              According to our records, you have already cast your vote in this election.
              Each voter can only vote once.
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onVote={handleSelectCandidate}
            isSelected={selectedCandidate === candidate.id}
            hasVoted={isVoted}
          />
        ))}
      </div>
      
      {!isVoted && (
        <div className="flex justify-end">
          <Button
            variant="success"
            size="lg"
            onClick={handleSubmitVote}
            disabled={!selectedCandidate || isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Recording Vote...' : 'Submit Vote'}
          </Button>
        </div>
      )}
      
      {voteSuccess && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            onClick={() => navigate('/results')}
          >
            View Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default Vote;