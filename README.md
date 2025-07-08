# Happy Movie 🎬

A modern movie catalog application built with React, Redux Toolkit, and TypeScript. Happy Movie provides an intuitive interface for browsing, managing, and discovering movies with advanced features like authentication, admin dashboard, and responsive design.

## ✨ Features

### 🎯 Core Features
- **Movie Browsing**: Browse movies with pagination (6 items per page)
- **Movie Details**: View comprehensive information about each movie
- **Search & Filter**: Search movies by title/description and filter by genre
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Beautiful UI**: Apple-level design aesthetics with smooth animations and micro-interactions

### 🔐 Authentication System
- **Role-based Access Control**: Different permissions for regular users and administrators
- **Secure Login**: Form validation with error handling and loading states
- **Demo Credentials**: Easy access with pre-configured test accounts

### 👑 Admin Features
- **Admin Dashboard**: Complete movie management interface
- **CRUD Operations**: Create, read, update, and delete movies
- **Movie Form**: Advanced form with validation and image preview
- **Bulk Management**: Efficient handling of large movie collections

### 📱 User Experience
- **Contact Form**: Movie suggestion system with comprehensive validation
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: User-friendly error messages and recovery options
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit with RTK Query patterns
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Backend**: JSON Server (development)
- **HTTP Client**: Axios

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/f-pili/happy-movie.git
   cd happy-movie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run dev
   ```

## ⚙️ Setup and Configuration

### Development Environment

1. **Start the JSON Server (Database)**
   ```bash
   npm run db
   ```
   This starts the mock API server on `http://localhost:3001`

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This starts the React application on `http://localhost:5173`

3. **Start Both Servers Simultaneously**
   ```bash
   npm run dev:full
   ```
   This command runs both the JSON server and React dev server concurrently

### Project Structure

```
happy-movie/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Footer.tsx     # Application footer
│   │   ├── LoginForm.tsx  # Authentication form
│   │   ├── MovieCard.tsx  # Movie display component
│   │   ├── MovieForm.tsx  # Add/edit movie form
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Pagination.tsx # Pagination controls
│   │   └── PrivateRoute.tsx # Route protection
│   ├── pages/             # Page components
│   │   ├── AdminDashboard.tsx # Admin management interface
│   │   ├── Contact.tsx    # Movie suggestion form
│   │   ├── Homepage.tsx   # Landing page
│   │   ├── Login.tsx      # Login page
│   │   ├── MovieDetails.tsx # Individual movie view
│   │   └── MoviesList.tsx # Movie browsing page
│   ├── services/          # API services
│   │   └── api.ts         # HTTP client and API calls
│   ├── store/             # Redux store
│   │   ├── index.ts       # Store configuration
│   │   └── slices/        # Redux slices
│   │       ├── authSlice.ts   # Authentication state
│   │       ├── moviesSlice.ts # Movies data management
│   │       └── uiSlice.ts     # UI state management
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # Shared interfaces
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── db.json                # Mock database
└── package.json           # Dependencies and scripts
```

## 🎮 Usage Examples

### Authentication

```typescript
// Login with demo credentials
const adminCredentials = {
  email: 'admin@test.com',
  password: 'admin123'
};

const userCredentials = {
  email: 'user@test.com',
  password: 'password123'
};
```

### Adding a New Movie (Admin Only)

```typescript
const newMovie = {
  title: 'Inception',
  description: 'A mind-bending thriller about dreams within dreams',
  year: 2010,
  rating: 8.8,
  imageUrl: 'https://example.com/inception.jpg',
  genre: 'Sci-Fi'
};
```

### API Usage

```typescript
import { moviesApi } from './services/api';

// Fetch movies with pagination
const movies = await moviesApi.fetchMovies({ 
  page: 1, 
  search: 'inception',
  genre: 'Sci-Fi'
});

// Fetch single movie
const movie = await moviesApi.fetchMovieById('1');

// Add new movie (admin only)
const newMovie = await moviesApi.addMovie(movieData);
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (React only) |
| `npm run dev:full` | Start both React and JSON server |
| `npm run db` | Start JSON server only |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Design System

### Color Palette
- **Primary**: Yellow (#FBBF24) - Brand color for buttons and accents
- **Secondary**: Gray (#374151) - Text and secondary elements
- **Background**: Gray-900 (#111827) - Dark theme background
- **Success**: Green (#10B981) - Success states
- **Error**: Red (#EF4444) - Error states
- **Warning**: Yellow (#F59E0B) - Warning states

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable font sizes with proper line spacing
- **Code**: Monospace font for technical content

### Responsive Breakpoints
- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🔐 Authentication & Authorization

### User Roles

| Role | Permissions |
|------|-------------|
| **Guest** | Browse movies, view details |
| **User** | All guest permissions + personalized features |
| **Admin** | All user permissions + CRUD operations, admin dashboard |

### Demo Accounts

| Role | Email | Password | Features |
|------|-------|----------|----------|
| **Admin** | admin@test.com | admin123 | Full access, movie management |
| **User** | user@test.com | password123 | Browse and view movies |

## 📡 API Documentation

### Base URL
```
http://localhost:3001
```

### Endpoints

#### Movies

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/movies` | Get all movies | `page`, `search`, `genre` |
| GET | `/movies/:id` | Get movie by ID | `id` (string/number) |
| POST | `/movies` | Create new movie | Movie object |
| PUT | `/movies/:id` | Update movie | `id`, Movie object |
| DELETE | `/movies/:id` | Delete movie | `id` (string/number) |

#### Movie Object Schema

```typescript
interface Movie {
  id: number | string;
  title: string;
  description: string;
  year: number;
  rating: number;
  imageUrl: string;
  genre?: string;
}
```

### API Response Examples

#### Get Movies
```json
{
  "movies": [
    {
      "id": "1",
      "title": "The Dark Knight",
      "description": "Batman faces the Joker...",
      "year": 2008,
      "rating": 9.0,
      "imageUrl": "https://example.com/image.jpg",
      "genre": "Action"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 25
}
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# Development Settings
VITE_DEV_MODE=true
```

### Tailwind Configuration

The project uses a custom Tailwind configuration optimized for the movie catalog:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FBBF24',
        secondary: '#374151'
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Movies Not Loading
**Problem**: "Error fetching movies: Network Error"
**Solution**: 
- Ensure JSON server is running: `npm run db`
- Check if port 3001 is available
- Verify `db.json` file exists

#### 2. Login Not Working
**Problem**: Authentication fails with correct credentials
**Solution**:
- Use exact demo credentials (case-sensitive)
- Clear browser cache and localStorage
- Check network tab for API calls

#### 3. Movie Details Show "Not Found"
**Problem**: Clicking "View Details" shows movie not found
**Solution**:
- Ensure movie IDs are consistent between list and details
- Check if the movie exists in `db.json`
- Verify API endpoint is accessible

#### 4. Build Errors
**Problem**: TypeScript compilation errors
**Solution**:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
npx tsc --noEmit
```

#### 5. Styling Issues
**Problem**: Tailwind classes not applying
**Solution**:
- Ensure Tailwind is properly configured
- Check if `@tailwind` directives are in `src/index.css`
- Restart development server

### Performance Optimization

#### 1. Image Loading
- Use optimized image URLs
- Implement lazy loading for movie posters
- Consider using WebP format for better compression

#### 2. Bundle Size
- Use dynamic imports for large components
- Optimize dependencies with tree shaking
- Monitor bundle size with `npm run build`

### Development Tips

#### 1. Hot Reload Issues
```bash
# If hot reload stops working
rm -rf .vite
npm run dev
```

#### 2. Database Reset
```bash
# Reset to original movie data
git checkout db.json
```

#### 3. State Debugging
- Use Redux DevTools extension
- Enable Redux logging in development
- Check component re-renders with React DevTools

## 📝 License

This project is created for educational purposes. Feel free to use it as a learning resource or starting point for your own projects.

---

**Happy Movie** - Making movie discovery a joyful experience! 🎬✨

**Note**: This is a mock application using simulated data. In a real-world scenario, you would replace the mock data and API calls with actual backend services.