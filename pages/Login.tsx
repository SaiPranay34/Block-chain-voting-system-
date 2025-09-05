import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, UserCog } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';
import PageTitle from '../components/common/PageTitle';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'voter' | 'admin'>('voter');
  const [voterId, setVoterId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  
  const handleVoterLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (voterId && password) {
        login({ 
          id: `voter-${Date.now()}`,
          voterId,
          role: 'voter'
        });
        toast.success("Login successful");
        navigate('/voter-panel');
      } else {
        toast.error("Please enter both Voter ID and password");
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (adminId && password) {
        login({ 
          id: `admin-${Date.now()}`,
          role: 'admin'
        });
        toast.success("Admin login successful");
        navigate('/admin-panel');
      } else {
        toast.error("Please enter both Admin ID and password");
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex flex-col items-center justify-center">
      <PageTitle
        title="Login to BlockVote"
        subtitle="Access the secure blockchain voting platform"
      />
      
      <div className="w-full max-w-md card">
        {/* Tabs */}
        <div className="flex">
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              activeTab === 'voter'
                ? 'bg-white border-b-2 border-blue-800 text-blue-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => setActiveTab('voter')}
          >
            <div className="flex items-center justify-center gap-2">
              <User size={18} />
              <span>Voter Login</span>
            </div>
          </button>
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              activeTab === 'admin'
                ? 'bg-white border-b-2 border-blue-800 text-blue-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => setActiveTab('admin')}
          >
            <div className="flex items-center justify-center gap-2">
              <UserCog size={18} />
              <span>Admin Login</span>
            </div>
          </button>
        </div>
        
        {/* Voter Login Form */}
        {activeTab === 'voter' && (
          <form onSubmit={handleVoterLogin} className="p-6">
            <div className="mb-4">
              <label htmlFor="voterId" className="block text-sm font-medium text-slate-700 mb-1">
                Voter ID
              </label>
              <input
                type="text"
                id="voterId"
                className="input-field"
                placeholder="Enter your voter ID"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                <>
                  <Lock size={18} />
                  Login as Voter
                </>
              )}
            </button>
            
            <p className="mt-4 text-sm text-slate-600 text-center">
              <span className="font-medium">Demo Mode:</span> Enter any Voter ID and password
            </p>
          </form>
        )}
        
        {/* Admin Login Form */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="p-6">
            <div className="mb-4">
              <label htmlFor="adminId" className="block text-sm font-medium text-slate-700 mb-1">
                Admin ID
              </label>
              <input
                type="text"
                id="adminId"
                className="input-field"
                placeholder="Enter your admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="adminPassword" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="adminPassword"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                <>
                  <Lock size={18} />
                  Login as Admin
                </>
              )}
            </button>
            
            <p className="mt-4 text-sm text-slate-600 text-center">
              <span className="font-medium">Demo Mode:</span> Enter any Admin ID and password
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;