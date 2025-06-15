import React from 'react'
import { useEffect, useState } from "react";
import apiBaseUrl from "../../../config/axiosConfig";
import { FaEye, FaSpinner, FaStar, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FunnelIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";

type Product = {
  id: string;
  Image: string;
  Title: string;
  Price: number;
  AverageRating: number;
  Currency: string;
  Views: number;
};

type ApiResponse = {
  products?: Product[];
  error?: string;
};

type SearchByImageResultsProps = {
  imageQuery: File | null;
};

interface FilterOptions {
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  popular?: boolean;
}

const SearchByImageResultsWithFilters: React.FC<SearchByImageResultsProps> = ({ imageQuery }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFilterOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value !== '' ? Number(value) : undefined
    }));
  };

  // Toggle popular filter
  const togglePopularFilter = () => {
    setFilterOptions(prev => ({
      ...prev,
      popular: !prev.popular
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterOptions({});
    setSort("");
    setShowFilters(false);
  };

  // Build query string from filter options
  const buildFilterQuery = () => {
    const filters = [];
    if (filterOptions.rating !== undefined) {
      filters.push(`rating=${filterOptions.rating}`);
    }
    if (filterOptions.minPrice !== undefined) {
      filters.push(`minPrice=${filterOptions.minPrice}`);
    }
    if (filterOptions.maxPrice !== undefined) {
      filters.push(`maxPrice=${filterOptions.maxPrice}`);
    }
    if (filterOptions.popular !== undefined) {
      filters.push(`popular=${filterOptions.popular}`);
    }
    return filters.join('&');
  };

  useEffect(() => {
    if (!imageQuery) {
      setResults([]);
      setError(null);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', imageQuery);

        // First, get initial search results
        const searchResponse = await apiBaseUrl.post<ApiResponse>(`/products/search-by-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        if (searchResponse.data.error || !searchResponse.data.products || searchResponse.data.products.length === 0) {
          setError(searchResponse.data.error || "No products found matching your image.");
          setResults([]);
          return;
        }

        // Then, apply filters if any are set
        const productIds = searchResponse.data.products.map(p => p.id).join(',');
        if (filterOptions.rating || filterOptions.minPrice || filterOptions.maxPrice || sort) {
          const filterUrl = `/products/searchFilters?product_ids=${productIds}`;
          const filterQuery = buildFilterQuery();
          const sortQuery = sort ? `&${sort}` : '';
          
          const filterResponse = await apiBaseUrl.get(`${filterUrl}${filterQuery ? `&${filterQuery}` : ''}${sortQuery}`);
          setResults(filterResponse.data.products || []);
        } else {
          setResults(searchResponse.data.products);
        }
      } catch (error) {
        console.error(error);
        setError("No products found matching your image.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [imageQuery, filterOptions, sort]);

  const handleProductClick = (id: string) => {
    navigate(`/productPage/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-4xl text-customBlue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 max-w-md">{error}</p>
      </div>
    );
  }

  if (results.length === 0 && !imageQuery) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
          Upload an Image
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Upload an image to find similar products
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Filter & Sort Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Enhanced Filter Button */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FunnelIcon className="w-5 h-5" />
              Filters
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 
                         dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 
                         rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              {(filterOptions.rating || filterOptions.minPrice || filterOptions.maxPrice || filterOptions.popular) && (
                <button
                  onClick={clearFilters}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 
                           rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Sort Options */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <ArrowsUpDownIcon className="w-5 h-5" />
              Sort By
            </label>
            <div className="relative group">
              <select
                onChange={(e) => setSort(e.target.value)}
                value={sort}
                className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 
                         dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 pr-10 
                         rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                         focus:border-customBlue transition-all duration-300"
              >
                <option value="">Select Sorting</option>
                <option value="sortBy=popular&order=desc">🔥 Most Popular</option>
                <option value="sortBy=rating&order=desc">⭐ Highest Rated</option>
                <option value="sortBy=price&order=asc">💰 Price: Low to High</option>
                <option value="sortBy=price&order=desc">💰 Price: High to Low</option>
                <option value="sortBy=views&order=desc">👁️ Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Popular Items Filter */}
              <div>
                <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="popular"
                    checked={filterOptions.popular || false}
                    onChange={togglePopularFilter}
                    className="w-5 h-5 text-customBlue rounded focus:ring-customBlue/50"
                  />
                  🔥 Popular Items
                </label>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  name="rating"
                  value={filterOptions.rating || ''}
                  onChange={handleFilterChange}
                  className="w-full bg-white dark:bg-gray-600 border border-gray-200 
                           dark:border-gray-500 text-gray-700 dark:text-gray-200 py-2 px-3 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                           focus:border-customBlue transition-all duration-300"
                >
                  <option value="">Any Rating</option>
                  <option value="4">⭐ 4+ Stars</option>
                  <option value="3">⭐ 3+ Stars</option>
                  <option value="2">⭐ 2+ Stars</option>
                  <option value="1">⭐ 1+ Stars</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range ($)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filterOptions.minPrice || ''}
                    onChange={handleFilterChange}
                    className="w-full bg-white dark:bg-gray-600 border border-gray-200 
                             dark:border-gray-500 text-gray-700 dark:text-gray-200 py-2 px-3 
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                             focus:border-customBlue transition-all duration-300"
                    min="0"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filterOptions.maxPrice || ''}
                    onChange={handleFilterChange}
                    className="w-full bg-white dark:bg-gray-600 border border-gray-200 
                             dark:border-gray-500 text-gray-700 dark:text-gray-200 py-2 px-3 
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                             focus:border-customBlue transition-all duration-300"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Active Filters Display */}
      {(filterOptions.rating || filterOptions.minPrice || filterOptions.maxPrice || filterOptions.popular) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {filterOptions.popular && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              🔥 Popular
              <button 
                onClick={() => setFilterOptions(prev => ({ ...prev, popular: undefined }))}
                className="ml-1 text-blue-800 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filterOptions.rating && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              ⭐ {filterOptions.rating}+ Rating
              <button 
                onClick={() => setFilterOptions(prev => ({ ...prev, rating: undefined }))}
                className="ml-1 text-yellow-800 hover:text-yellow-900"
              >
                ×
              </button>
            </span>
          )}
          {(filterOptions.minPrice || filterOptions.maxPrice) && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              💰 {filterOptions.minPrice ? `$${filterOptions.minPrice}` : '$0'} - {filterOptions.maxPrice ? `$${filterOptions.maxPrice}` : '∞'}
              <button 
                onClick={() => setFilterOptions(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))}
                className="ml-1 text-green-800 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(({ id, Image, Title, Price, AverageRating, Currency, Views }) => (
          <div
            key={id}
            onClick={() => handleProductClick(id)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
                     transform hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden group"
          >
            <div className="relative h-48 sm:h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:from-black/10 transition-all duration-300" />
              <img 
                src={Image} 
                alt={Title} 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full flex items-center text-xs">
                <FaEye className="mr-1" />
                {Views || 0} views
              </div>
            </div>
            <div className="p-4 space-y-3">
              <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 group-hover:text-customBlue transition-colors duration-200">
                {Title}
              </h3>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar 
                    key={index} 
                    className={`${index < AverageRating ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`} 
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-customBlue dark:text-customBlue">
                  {Currency} {Price}$
                </p>
                <button className="px-4 py-2 bg-customBlue text-white rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchByImageResultsWithFilters;