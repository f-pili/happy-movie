import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

// Helper functions for localStorage
const saveUserToStorage = (user: User) => {
  try {
    localStorage.setItem('happyMovie_user', JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to localStorage:', error);
  }
};

const getUserFromStorage = (): User | null => {
  try {
    const stored = localStorage.getItem('happyMovie_user');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to get user from localStorage:', error);
    return null;
  }
};

const removeUserFromStorage = () => {
  try {
    localStorage.removeItem('happyMovie_user');
  } catch (error) {
    console.error('Failed to remove user from localStorage:', error);
  }
};
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@test.com' && password === 'admin123') {
      return {
        id: 1,
        email: 'admin@test.com',
        role: 'admin' as const,
        name: 'Admin User'
      };
    } else if (email === 'user@test.com' && password === 'password123') {
      return {
        id: 2,
        email: 'user@test.com',
        role: 'user' as const,
        name: 'Regular User'
      };
    } else {
      return rejectWithValue('Invalid credentials');
    }
  }
);

// Initialize state from localStorage
const storedUser = getUserFromStorage();
const initialState: AuthState = {
  user: storedUser,
  isLoggedIn: !!storedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      removeUserFromStorage();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        saveUserToStorage(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;