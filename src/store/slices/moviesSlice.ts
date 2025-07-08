import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState, Movie } from '../../types';
import { moviesApi, FetchMoviesParams } from '../../services/api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: FetchMoviesParams = {}, { rejectWithValue }) => {
    try {
      const response = await moviesApi.fetchMovies(params);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movies');
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const movie = await moviesApi.fetchMovieById(id);
      return movie;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movie');
    }
  }
);

export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movieData: Omit<Movie, 'id'>, { rejectWithValue }) => {
    try {
      const newMovie = await moviesApi.addMovie(movieData);
      return newMovie;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add movie');
    }
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async (movieData: Movie, { rejectWithValue }) => {
    try {
      const updatedMovie = await moviesApi.updateMovie(movieData);
      return updatedMovie;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update movie');
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id: number | string, { rejectWithValue }) => {
    try {
      await moviesApi.deleteMovie(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete movie');
    }
  }
);

const initialState: MoviesState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add movie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.loading = false;
        // Don't add to current movies array, let refetch handle it
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update movie
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        // Update the movie in the current movies array
        const index = state.movies.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
        // Update current movie if it's the same
        if (state.currentMovie?.id === action.payload.id) {
          state.currentMovie = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete movie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the movie from the current movies array
        state.movies = state.movies.filter(m => m.id !== action.payload);
        // Clear current movie if it's the deleted one
        if (state.currentMovie?.id === action.payload) {
          state.currentMovie = null;
        }
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentMovie, clearError, setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;