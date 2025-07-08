import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMovies, deleteMovie, setCurrentPage } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';
import MovieForm from '../components/MovieForm';
import Pagination from '../components/Pagination';
import { Plus, Smile } from 'lucide-react';
import { Movie } from '../types';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, totalPages, currentPage } = useSelector((state: RootState) => state.movies);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();

 useEffect(() => {
    // Fetch movies for admin dashboard with current page
    dispatch(fetchMovies({ page: currentPage }));
  }, [dispatch]);

  // Refetch when currentPage changes
  useEffect(() => {
    dispatch(fetchMovies({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleAddMovie = () => {
    setEditingMovie(undefined);
    setShowMovieForm(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setShowMovieForm(true);
  };

  const handleDeleteMovie = (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch(deleteMovie(id));
    }
  };

  const handleCloseForm = () => {
    setShowMovieForm(false);
    setEditingMovie(undefined);
  };

  const handleFormSuccess = () => {
    // Refresh current page after successful add/edit
    dispatch(fetchMovies({ page: currentPage }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchMovies({ page }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-gray-300 text-lg">
            Manage your movie collection with full control
          </p>
        </div>

        {/* Add Movie Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Movie management</h2>
          <button
            onClick={handleAddMovie}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add movie</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && !error && (
          <>
            {movies.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smile className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No movies yet</h3>
                <p className="text-gray-600 mb-6">
                  Start building your movie collection by adding your first movie
                </p>
                <button
                  onClick={handleAddMovie}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg transition-colors font-semibold"
                >
                  Add First Movie
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    showActions={true}
                    onEdit={handleEditMovie}
                    onDelete={handleDeleteMovie}
                  />
                ))}
              </div>
            )}

            {/* Pagination for Admin Dashboard */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}

        {/* Movie Form Modal */}
        {showMovieForm && (
          <MovieForm
            movie={editingMovie}
            onClose={handleCloseForm}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;