import axios from 'axios';
import { Movie } from '../types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FetchMoviesParams {
  page?: number;
  search?: string;
  genre?: string;
}

export interface FetchMoviesResponse {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const moviesApi = {
  // Fetch movies with pagination and filtering
  fetchMovies: async (params: FetchMoviesParams = {}): Promise<FetchMoviesResponse> => {
    const { page = 1, search = '', genre = '' } = params;
    const limit = 6; // Items per page
    
    try {
      // First, get all movies to handle filtering manually
      let allMoviesResponse = await api.get('/movies');
      let allMovies: Movie[] = allMoviesResponse.data;

      // Apply search filter
      if (search) {
        allMovies = allMovies.filter(movie => 
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply genre filter
      if (genre) {
        allMovies = allMovies.filter(movie => movie.genre === genre);
      }

      // Calculate pagination
      const total = allMovies.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const movies = allMovies.slice(startIndex, endIndex);
      
      return {
        movies,
        totalPages,
        currentPage: page,
        total,
      };
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies');
    }
  },

  // Fetch a single movie by ID
  fetchMovieById: async (id: number | string): Promise<Movie> => {
    try {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('Movie not found');
      }
      throw new Error('Failed to fetch movie');
    }
  },

  // Add a new movie
  addMovie: async (movieData: Omit<Movie, 'id'>): Promise<Movie> => {
    try {
      const response = await api.post('/movies', movieData);
      return response.data;
    } catch (error) {
      console.error('Error adding movie:', error);
      throw new Error('Failed to add movie');
    }
  },

  // Update an existing movie
  updateMovie: async (movieData: Movie): Promise<Movie> => {
    try {
      const response = await api.put(`/movies/${movieData.id}`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('Movie not found');
      }
      throw new Error('Failed to update movie');
    }
  },

  // Delete a movie
  deleteMovie: async (id: number | string): Promise<number | string> => {
    try {
      await api.delete(`/movies/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting movie:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('Movie not found');
      }
      throw new Error('Failed to delete movie');
    }
  },
};

export default api;