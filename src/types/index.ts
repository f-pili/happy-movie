export interface Movie {
  id: number | string;
  title: string;
  description: string;
  year: number;
  rating: number;
  imageUrl: string;
  genre?: string;
}

export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface MoviesState {
  movies: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

export interface UIState {
  searchTerm: string;
  selectedGenre: string;
  sortBy: 'title' | 'year' | 'rating';
  sortOrder: 'asc' | 'desc';
}
