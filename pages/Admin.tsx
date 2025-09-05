import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVoting } from '../contexts/VotingContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import VotesChart from '../components/voting/VotesChart';
import { Shield, Users, Vote, AlertCircle, Clock } from 'lucide-react';
import { mockElection, mockUsers } from '../utils/mockData';

const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { blockchain, candidates, getVoteCounts } = useVoting();
  const [isVerifyingChain, setIsVerifyingChain] = useState(false);
  const [chainStatus, setChainStatus] = useState<'not-verified' | 'valid' | 'invalid'>('not-verified');
  
  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleVerifyBlockchain = () => {
    setIsVerifyingChain(true);
    
    // Simulate verification process
    setTimeout(() => {
      const isValid = blockchain.isChainValid();
      setChainStatus(isValid ? 'valid' : 'invalid');
      setIsVerifyingChain(false);
    }, 2000);
  };
  
  const totalVoters = mockUsers.length;
  const votedCount = mockUsers.filter(user => user.hasVoted).length;
  const voteCounts = getVoteCounts();
  const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);
  const votingPercentage = Math.round((totalVotes / totalVoters) * 100);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Monitor and manage the election process</p>
      
      {/* Election Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Election Status</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-xs text-blue-600 font-medium">Total Voters</p>
                <p className="text-2xl font-bold text-blue-800">{totalVoters}</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 flex items-center">
              <Vote className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-xs text-green-600 font-medium">Votes Cast</p>
                <p className="text-2xl font-bold text-green-800">
                  {totalVotes} <span className="text-sm">({votingPercentage}%)</span>
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-3 flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <p className="text-xs text-yellow-600 font-medium">Time Remaining</p>
                <p className="text-xl font-bold text-yellow-800">
                  {Math.floor((mockElection.endDate - Date.now()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Election Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700"><strong>Title:</strong> {mockElection.title}</p>
              <p className="text-gray-700"><strong>Description:</strong> {mockElection.description}</p>
              <p className="text-gray-700">
                <strong>Duration:</strong> {new Date(mockElection.startDate).toLocaleDateString()} - {new Date(mockElection.endDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700"><strong>Status:</strong> {mockElection.status}</p>
              <p className="text-gray-700"><strong>Number of Candidates:</strong> {candidates.length}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Blockchain Status</h2>
          
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-2">Verify the integrity of the blockchain to ensure no tampering has occurred.</p>
            
            <Button 
              variant="primary" 
              fullWidth 
              onClick={handleVerifyBlockchain}
              isLoading={isVerifyingChain}
            >
              {isVerifyingChain ? 'Verifying...' : 'Verify Blockchain'}
            </Button>
            
            {chainStatus !== 'not-verified' && (
              <div className={`mt-4 p-3 rounded-md flex items-center ${
                chainStatus === 'valid' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {chainStatus === 'valid' ? (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    <span>Blockchain verified and secure</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Blockchain integrity compromised!</span>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chain Stats</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-600">Blocks:</span>
                <span className="font-medium">{blockchain.chain.length}</span>
              </p>
              <p className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-600">Total Transactions:</span>
                <span className="font-medium">{totalVotes}</span>
              </p>
              <p className="flex justify-between py-1">
                <span className="text-gray-600">Difficulty:</span>
                <span className="font-medium">{blockchain.difficulty}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Vote Distribution */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vote Distribution</h2>
        <Card className="p-4">
          <div className="h-72">
            <VotesChart candidates={candidates} votes={voteCounts} />
          </div>
        </Card>
      </div>
      
      {/* Registered Voters */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Registered Voters</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voter ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.voterId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.hasVoted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.hasVoted ? 'Voted' : 'Not Voted'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;