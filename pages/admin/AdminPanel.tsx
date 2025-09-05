import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Users, BarChart3, Activity, Download, Power } from 'lucide-react';
import PageTitle from '../../components/common/PageTitle';
import CandidateTable from '../../components/admin/CandidateTable';
import ResultsChart from '../../components/admin/ResultsChart';
import { useElectionStore } from '../../store/electionStore';

const AdminPanel = () => {
  const { candidates, isElectionActive, fetchCandidates, toggleElectionStatus, isLoading } = useElectionStore();
  const [selectedTab, setSelectedTab] = useState<'stats' | 'chart'>('stats');
  
  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);
  
  const handleToggleElection = () => {
    toggleElectionStatus();
    
    if (isElectionActive) {
      toast.success("Election has been closed");
    } else {
      toast.success("Election has been opened");
    }
  };
  
  const handleExportResults = () => {
    // Create CSV content
    const headers = ['ID', 'Name', 'Party', 'Votes'];
    const csvContent = [
      headers.join(','),
      ...candidates.map(c => 
        [c.id, c.name, c.party, c.voteCount].join(',')
      )
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `election-results-${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
    
    toast.success("Results exported successfully");
  };
  
  // Calculate total votes
  const totalVotes = candidates.reduce((sum, c) => sum + c.voteCount, 0);
  
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <PageTitle
        title="Admin Dashboard"
        subtitle="Monitor election progress and manage voting system"
      />
      
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-800" />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Total Candidates</p>
                <p className="text-2xl font-bold text-slate-900">{candidates.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6 bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-emerald-800" />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Total Votes</p>
                <p className="text-2xl font-bold text-slate-900">{totalVotes}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6 bg-amber-50 border border-amber-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Activity className="h-6 w-6 text-amber-800" />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Election Status</p>
                <p className={`text-lg font-bold ${isElectionActive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {isElectionActive ? 'Active' : 'Closed'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex">
            <button
              className={`px-4 py-2 ${
                selectedTab === 'stats' 
                  ? 'bg-blue-800 text-white' 
                  : 'bg-slate-200 text-slate-800'
              } rounded-l-md`}
              onClick={() => setSelectedTab('stats')}
            >
              Vote Stats
            </button>
            <button
              className={`px-4 py-2 ${
                selectedTab === 'chart' 
                  ? 'bg-blue-800 text-white' 
                  : 'bg-slate-200 text-slate-800'
              } rounded-r-md`}
              onClick={() => setSelectedTab('chart')}
            >
              Chart View
            </button>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleExportResults}
              className="btn-secondary flex items-center gap-1"
            >
              <Download size={16} />
              Export Results
            </button>
            <button 
              onClick={handleToggleElection}
              className={`${isElectionActive ? 'btn-danger' : 'btn-success'} flex items-center gap-1`}
            >
              <Power size={16} />
              {isElectionActive ? 'Close Election' : 'Open Election'}
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading election data...</p>
          </div>
        ) : (
          selectedTab === 'stats' ? (
            <CandidateTable candidates={candidates} />
          ) : (
            <ResultsChart candidates={candidates} />
          )
        )}
      </div>
    </div>
  );
};

export default AdminPanel;