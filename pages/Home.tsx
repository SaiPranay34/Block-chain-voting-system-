import { Link } from 'react-router-dom';
import { Vote, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Secure and Transparent Elections with Blockchain
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Experience voting reimagined through the power of blockchain technology. 
            Cast your vote with confidence in a secure, transparent election system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <Link to="/login" className="btn bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3">
                Login to Vote
              </Link>
            ) : (
              <>
                {user?.role === 'voter' && (
                  <Link to="/voter-panel" className="btn bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3">
                    Cast Your Vote
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin-panel" className="btn bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3">
                    Admin Dashboard
                  </Link>
                )}
              </>
            )}
            <Link to="/results" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
              View Results
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why BlockVote?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure</h3>
              <p className="text-slate-600">
                End-to-end encryption and blockchain immutability ensures your vote remains secure and tamper-proof.
              </p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Vote className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent</h3>
              <p className="text-slate-600">
                Every vote is recorded on a public blockchain, making the election fully transparent and verifiable.
              </p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Anonymous</h3>
              <p className="text-slate-600">
                Your identity remains protected while your vote is securely recorded, maintaining voter privacy.
              </p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time</h3>
              <p className="text-slate-600">
                View real-time results as votes are recorded, ensuring timely and accurate election outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connector Line */}
              <div className="absolute left-8 top-8 bottom-0 w-1 bg-blue-300 hidden md:block"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center text-xl font-bold z-10">
                      1
                    </div>
                  </div>
                  <div className="card p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">Login with Your Voter ID</h3>
                    <p className="text-slate-600">
                      Securely login using your authorized voter ID to access the voting platform.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center text-xl font-bold z-10">
                      2
                    </div>
                  </div>
                  <div className="card p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                    <p className="text-slate-600">
                      Link your MetaMask wallet to sign and authenticate your vote on the blockchain.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center text-xl font-bold z-10">
                      3
                    </div>
                  </div>
                  <div className="card p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">Cast Your Vote</h3>
                    <p className="text-slate-600">
                      Review the candidates and cast your vote, which will be securely recorded on the blockchain.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center text-xl font-bold z-10">
                      4
                    </div>
                  </div>
                  <div className="card p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">View Election Results</h3>
                    <p className="text-slate-600">
                      Monitor the election results in real-time as votes are processed and recorded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-900 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Secure Voting?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the blockchain voting revolution and make your voice heard with confidence.
          </p>
          <Link to="/login" className="btn bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3">
            Start Voting Now
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-800 text-slate-300">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Vote size={20} />
              <span className="font-bold text-lg">BlockVote</span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} BlockVote. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;