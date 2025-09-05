import { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import PageTitle from '../components/common/PageTitle';
import CandidateTable from '../components/admin/CandidateTable';
import ResultsChart from '../components/admin/ResultsChart';
import { useElectionStore } from '../store/electionStore';

const Results = () => {
  const { candidates, fetchCandidates, isLoading } = useElectionStore();
  
  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);
  
  // Find candidate with most votes
  const sortedCandidates = [...candidates].sort((a, b) => b.voteCount - a.voteCount);
  const leadingCandidate = sortedCandidates.length > 0 ? sortedCandidates[0] : null;
  
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <PageTitle
        title="Election Results"
        subtitle="View real-time results of the ongoing election"
      />
      
      <div className="container mx-auto max-w-6xl">
        {leadingCandidate && (
          <div className="mb-8 card overflow-hidden">
            <div className="bg-blue-900 text-white p-4 text-center">
              <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                <Trophy className="text-yellow-400" />
                Current Leader
              </h3>
            </div>
            <div className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={leadingCandidate.imageUrl}
                  alt={leadingCandidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-blue-900">{leadingCandidate.name}</h3>
                <p className="text-blue-800">{leadingCandidate.party}</p>
                <p className="mt-2 text-lg">
                  <span className="font-bold">{leadingCandidate.voteCount}</span> votes
                </p>
                <p className="mt-1 text-slate-600 italic">"{leadingCandidate.slogan}"</p>
              </div>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading election results...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <CandidateTable candidates={candidates} />
            </div>
            <div className="lg:col-span-2">
              <ResultsChart candidates={candidates} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;