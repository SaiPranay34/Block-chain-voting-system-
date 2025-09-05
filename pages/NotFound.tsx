import { Link } from 'react-router-dom';
import { Vote, ChevronLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center">
          <Vote size={80} className="text-blue-800" />
        </div>
        <h1 className="mt-6 text-4xl font-bold text-slate-900">404 - Page Not Found</h1>
        <p className="mt-4 text-lg text-slate-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="mt-8 inline-flex items-center gap-2 btn-primary"
        >
          <ChevronLeft size={18} />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;