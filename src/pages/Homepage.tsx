import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { fetchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';
import { Smile, Users, Play } from 'lucide-react';
import backgroundImg from '/src/assets/images/hero-bg-min.webp'

const Homepage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading } = useSelector((state: RootState) => state.movies);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  const featuredMovies = movies.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-900">

      {/* Hero Section */}
      <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-24 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <Smile className="w-10 h-10 text-black" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-400">Happy Movie</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Discover, explore, and manage your favorite movies in one beautiful place
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/movies"
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 flex items-center space-x-2 text-lg"
            >
              <Play className="w-5 h-5" />
              <span>Browse movies</span>
            </Link>
            
            {!isLoggedIn && (
              <Link
                to="/login"
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300 text-lg"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>

      {/* Welcome Message */}
      {isLoggedIn && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-600 text-lg">
                {user?.role === 'admin' 
                  ? 'You have admin privileges. You can manage movies and view the admin dashboard.'
                  : 'Enjoy browsing our extensive collection of movies.'
                }
              </p>
              
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="inline-block mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Featured Movies */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured movies</h2>
          <p className="text-gray-300 text-lg">
            Discover our handpicked selection of amazing movies
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/movies"
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <span>View all</span>
            <Play className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;