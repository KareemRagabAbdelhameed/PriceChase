import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | PriceChase';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg text-center space-y-8 relative">
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 w-64 h-64 bg-customBlue opacity-10 dark:opacity-20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Main content */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          {/* 404 Number */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-customBlue mb-4 animate-pulse">
            404
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base max-w-md mx-auto">
            Oops! The page you're looking for seems to have vanished into thin air. Let's get you back on track.
          </p>
          
          {/* Action Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-customBlue text-white px-6 py-3 rounded-lg 
                       hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 font-semibold
                       shadow-lg hover:shadow-xl active:scale-95"
          >
            <FaHome className="text-xl" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Additional help text */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          If you believe this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;