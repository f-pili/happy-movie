import React from 'react';
import { Smile, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-yellow-400 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Smile className="w-6 h-6 text-black" />
            <span className="text-lg font-bold text-black">Happy Movie</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-1 text-gray-600">
            <span>© 2025 Happy Movie. Made with</span>
            <Heart className="w-4 h-4 text-yellow-600 fill-current" />
            <span>for movie lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;