import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  provider: any;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  checkConnection: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  isConnected: false,
  account: null,
  chainId: null,
  provider: null,
  
  connectWallet: async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return false;
    }
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      if (accounts.length > 0) {
        set({ 
          isConnected: true,
          account: accounts[0],
          chainId,
          provider: window.ethereum
        });
        
        // Setup listeners
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            get().disconnectWallet();
          } else {
            set({ account: accounts[0] });
          }
        });
        
        window.ethereum.on('chainChanged', (chainId: string) => {
          set({ chainId });
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return false;
    }
  },
  
  disconnectWallet: () => {
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
    }
    set({ 
      isConnected: false, 
      account: null,
      chainId: null,
      provider: null
    });
  },
  
  checkConnection: async () => {
    if (!window.ethereum) return;
    
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts' 
      });
      
      if (accounts.length > 0) {
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        });
        
        set({ 
          isConnected: true,
          account: accounts[0],
          chainId,
          provider: window.ethereum
        });
      }
    } catch (error) {
      console.error("Failed to check wallet connection:", error);
    }
  }
}));