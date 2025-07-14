import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {

const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-yellow-400 mb-4 animate-bounce">
              404
            </div>
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-black" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Page not found
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
            The path {location.pathname} doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 text-lg"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            
            <Link
              to="/movies"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 text-lg"
            >
              <Search className="w-5 h-5" />
              <span>Browse Movies</span>
            </Link>
          </div>

          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center space-x-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;