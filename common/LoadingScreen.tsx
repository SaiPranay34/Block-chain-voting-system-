import { Circle as CircleNotch } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <CircleNotch className="animate-spin h-12 w-12 mx-auto text-blue-800" />
        <p className="mt-4 text-lg font-medium text-slate-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;