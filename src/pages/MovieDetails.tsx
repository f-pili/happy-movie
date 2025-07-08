import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMovieById, clearCurrentMovie } from '../store/slices/moviesSlice';
import { Star, Calendar, ArrowLeft, Clock, Tag } from 'lucide-react';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentMovie, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
    
    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [id, dispatch]);

  const handleGoBack = () => {
    navigate('/movies');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoBack}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentMovie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 mb-8 text-gray-300 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to movies</span>
        </button>

        {/* Movie Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Movie Poster */}
            <div className="lg:w-1/3">
              <img
                src={currentMovie.imageUrl}
                alt={currentMovie.title}
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>

            {/* Movie Info */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {currentMovie.title}
                </h1>

                {/* Movie Meta */}
                <div className="flex flex-wrap items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{currentMovie.year}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-gray-600 font-semibold">{currentMovie.rating}/10</span>
                  </div>
                  
                  {currentMovie.genre && (
                    <div className="flex items-center space-x-2">
                      <Tag className="w-5 h-5 text-gray-400" />
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        {currentMovie.genre}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {currentMovie.description}
                  </p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Release Year</h3>
                    <p className="text-gray-600">{currentMovie.year}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(currentMovie.rating / 2)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">({currentMovie.rating}/10)</span>
                    </div>
                  </div>
                  
                  {currentMovie.genre && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Genre</h3>
                      <p className="text-gray-600">{currentMovie.genre}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;