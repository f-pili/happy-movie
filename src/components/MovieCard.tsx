import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Eye } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  showActions?: boolean;
  onEdit?: (movie: Movie) => void;
  onDelete?: (id: number | string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showActions = false, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-lg flex items-center space-x-1 font-semibold">
          <Star className="w-4 h-4 fill-current" />
          <span>{movie.rating}</span>
        </div>
        
        <Link
          to={`/movies/${movie.id}`}
          className="absolute bottom-3 left-3 right-3 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 font-semibold"
        >
          <Eye className="w-4 h-4" />
          <span>View details</span>
        </Link>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center space-x-4 mb-3 text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{movie.year}</span>
          </div>
          {movie.genre && (
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-semibold">
              {movie.genre}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {movie.description}
        </p>

        {showActions && (
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onEdit?.(movie)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg transition-colors font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(movie.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;