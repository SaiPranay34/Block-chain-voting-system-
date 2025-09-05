import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Vote, User, Lock, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when navigating
    setIsOpen(false);
  }, [location]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-3">
          <p className="text-sm hidden md:block">
            {user?.role === 'admin' ? 'Admin' : `Voter ID: ${user?.voterId}`}
          </p>
          <button
            onClick={handleLogout}
            className="btn-secondary flex items-center gap-1 py-1.5"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      );
    }
    
    return (
      <Link to="/login" className="btn-primary flex items-center gap-1">
        <Lock size={16} />
        Login
      </Link>
    );
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Vote size={24} className="text-blue-800" />
          <span className="font-bold text-xl text-blue-900">BlockVote</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-slate-700 hover:text-blue-800 transition-colors"
          >
            Home
          </Link>
          {isAuthenticated && user?.role === 'voter' && (
            <Link 
              to="/voter-panel" 
              className="text-slate-700 hover:text-blue-800 transition-colors"
            >
              Vote
            </Link>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <Link 
              to="/admin-panel" 
              className="text-slate-700 hover:text-blue-800 transition-colors"
            >
              Admin
            </Link>
          )}
          <Link 
            to="/results" 
            className="text-slate-700 hover:text-blue-800 transition-colors"
          >
            Results
          </Link>
          {renderAuthButtons()}
        </div>
        
        <div className="md:hidden flex items-center">
          {renderAuthButtons()}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-3 p-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ${
          isOpen ? 'max-h-screen py-3' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          <Link 
            to="/" 
            className="py-2 px-4 rounded-md hover:bg-slate-100 transition-colors"
          >
            Home
          </Link>
          {isAuthenticated && user?.role === 'voter' && (
            <Link 
              to="/voter-panel" 
              className="py-2 px-4 rounded-md hover:bg-slate-100 transition-colors"
            >
              Vote
            </Link>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <Link 
              to="/admin-panel" 
              className="py-2 px-4 rounded-md hover:bg-slate-100 transition-colors"
            >
              Admin
            </Link>
          )}
          <Link 
            to="/results" 
            className="py-2 px-4 rounded-md hover:bg-slate-100 transition-colors"
          >
            Results
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;