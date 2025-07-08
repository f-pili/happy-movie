import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../../types';

const initialState: UIState = {
  searchTerm: '',
  selectedGenre: '',
  sortBy: 'title',
  sortOrder: 'asc',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'title' | 'year' | 'rating'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.selectedGenre = '';
      state.sortBy = 'title';
      state.sortOrder = 'asc';
    },
  },
});

export const { setSearchTerm, setSelectedGenre, setSortBy, setSortOrder, resetFilters } = uiSlice.actions;
export default uiSlice.reducer;