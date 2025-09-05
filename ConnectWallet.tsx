import { useEffect, useState } from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { useWalletStore } from '../../store/walletStore';

interface ConnectWalletProps {
  onConnected?: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnected }) => {
  const { isConnected, account, connectWallet, checkConnection } = useWalletStore();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);
  
  const handleConnect = async () => {
    setError(null);
    
    if (!window.ethereum) {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }
    
    const success = await connectWallet();
    
    if (success && onConnected) {
      onConnected();
    }
  };
  
  if (isConnected) {
    return (
      <div className="card p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-full">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium">Wallet Connected</p>
            <p className="text-sm text-slate-600">
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card p-5">
      <h3 className="text-xl font-semibold mb-3">Connect Your Wallet</h3>
      <p className="text-slate-600 mb-4">
        To cast your vote, you need to connect your MetaMask wallet first.
      </p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <button
        onClick={handleConnect}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Wallet size={18} />
        Connect MetaMask
      </button>
      
      {!window.ethereum && (
        <p className="mt-3 text-sm text-center text-slate-600">
          Don't have MetaMask?{' '}
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Install it here
          </a>
        </p>
      )}
    </div>
  );
};

export default ConnectWallet;