import React, { useState } from 'react';
import { Mail, User, Calendar, Smile, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface FormData {
  movieTitle: string;
  releaseYear: string;
  genre: string;
  name: string;
  email: string;
  description: string;
}

interface FormErrors {
  movieTitle?: string;
  releaseYear?: string;
  genre?: string;
  name?: string;
  email?: string;
  description?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    movieTitle: '',
    releaseYear: '',
    genre: '',
    name: '',
    email: '',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Crime', 'Fantasy'];
  
  const currentYear = new Date().getFullYear();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Movie title validation
    if (!formData.movieTitle.trim()) {
      newErrors.movieTitle = 'Movie title is required';
    } else if (formData.movieTitle.trim().length < 2) {
      newErrors.movieTitle = 'Movie title must be at least 2 characters';
    }

    // Release year validation
    if (!formData.releaseYear) {
      newErrors.releaseYear = 'Release year is required';
    } else {
      const year = parseInt(formData.releaseYear);
      if (isNaN(year) || year < 1900 || year > currentYear) {
        newErrors.releaseYear = `Release year must be between 1900 and ${currentYear}`;
      }
    }

    // Genre validation
    if (!formData.genre) {
      newErrors.genre = 'Please select a genre';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call with 2-second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      
      // Clear form after successful submission
      setTimeout(() => {
        setFormData({
          movieTitle: '',
          releaseYear: '',
          genre: '',
          name: '',
          email: '',
          description: ''
        });
        setErrors({});
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Suggest a movie</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Help us expand our collection! Suggest movies you'd love to see in Happy Movie and tell us why they deserve a spot.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Smile className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Help us expand our collection</h2>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Thank you!</h3>
                  <p className="text-green-700">
                    Your movie suggestion has been submitted successfully. We'll review it and consider adding it to our collection.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Movie Title */}
              <div>
                <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Movie title *
                </label>
                <div className="relative">
                  <Smile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="movieTitle"
                    name="movieTitle"
                    value={formData.movieTitle}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
                      errors.movieTitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter movie title"
                    aria-describedby={errors.movieTitle ? 'movieTitle-error' : undefined}
                    aria-invalid={errors.movieTitle ? 'true' : 'false'}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.movieTitle && (
                  <p id="movieTitle-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.movieTitle}
                  </p>
                )}
              </div>

              {/* Release Year */}
              <div>
                <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700 mb-2">
                  Release year *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="releaseYear"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleInputChange}
                    min="1900"
                    max={currentYear}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
                      errors.releaseYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter release year"
                    aria-describedby={errors.releaseYear ? 'releaseYear-error' : undefined}
                    aria-invalid={errors.releaseYear ? 'true' : 'false'}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.releaseYear && (
                  <p id="releaseYear-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.releaseYear}
                  </p>
                )}
              </div>
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
                  errors.genre ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-describedby={errors.genre ? 'genre-error' : undefined}
                aria-invalid={errors.genre ? 'true' : 'false'}
                disabled={isSubmitting}
              >
                <option value="">Select a genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              {errors.genre && (
                <p id="genre-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.genre}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Why should we add this movie? *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={500}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us why this movie deserves a spot in our collection..."
                  aria-describedby={errors.description ? 'description-error' : 'description-help'}
                  aria-invalid={errors.description ? 'true' : 'false'}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p id="description-error" className="text-sm text-red-600" role="alert">
                    {errors.description}
                  </p>
                ) : (
                  <p id="description-help" className="text-sm text-gray-500">
                    Share what makes this movie special
                  </p>
                )}
                <span className={`text-sm ${formData.description.length > 450 ? 'text-red-600' : 'text-gray-500'}`}>
                  {formData.description.length}/500
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                aria-describedby="submit-help"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Submitting...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Submitted successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit</span>
                  </>
                )}
              </button>
              <p id="submit-help" className="mt-2 text-sm text-gray-500 text-center">
                We'll review your suggestion and get back to you via email
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;