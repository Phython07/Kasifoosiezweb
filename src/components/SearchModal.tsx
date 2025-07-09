import React, { useState, useEffect } from 'react';
import { X, Search, Clock, TrendingUp, MapPin, Star, Filter, Utensils, Coffee, Pizza, Sandwich } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'food' | 'category';
  rating: number;
  deliveryTime: string;
  image: string;
  description: string;
  price?: string;
  distance?: string;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const recentSearches = [
    'Pizza Palace',
    'Chicken burgers',
    'Sushi',
    'Indian curry',
    'Breakfast'
  ];

  const trendingSearches = [
    'Weekend specials',
    'Healthy bowls',
    'Late night delivery',
    'Family meals',
    'Desserts'
  ];

  const categories = [
    { id: 'all', name: 'All', icon: <Search className="h-4 w-4" /> },
    { id: 'restaurants', name: 'Restaurants', icon: <Utensils className="h-4 w-4" /> },
    { id: 'fast-food', name: 'Fast Food', icon: <Sandwich className="h-4 w-4" /> },
    { id: 'pizza', name: 'Pizza', icon: <Pizza className="h-4 w-4" /> },
    { id: 'coffee', name: 'Coffee', icon: <Coffee className="h-4 w-4" /> }
  ];

  const mockResults: SearchResult[] = [
    {
      id: '1',
      name: 'Pizza Palace',
      type: 'restaurant',
      rating: 4.8,
      deliveryTime: '25-35 min',
      image: '/api/placeholder/60/60',
      description: 'Authentic Italian pizza with fresh ingredients',
      distance: '1.2 km'
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      type: 'food',
      rating: 4.9,
      deliveryTime: '20-30 min',
      image: '/api/placeholder/60/60',
      description: 'Classic pizza with tomato, mozzarella, and basil',
      price: 'R89'
    },
    {
      id: '3',
      name: 'Burger Junction',
      type: 'restaurant',
      rating: 4.6,
      deliveryTime: '30-40 min',
      image: '/api/placeholder/60/60',
      description: 'Gourmet burgers and crispy fries',
      distance: '2.1 km'
    },
    {
      id: '4',
      name: 'Chicken Tikka',
      type: 'food',
      rating: 4.7,
      deliveryTime: '25-35 min',
      image: '/api/placeholder/60/60',
      description: 'Spicy grilled chicken with aromatic spices',
      price: 'R125'
    }
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(result =>
          result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 animate-fade-in-up">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl mt-20 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, food, cuisines..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
                autoFocus
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Filter Categories */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedFilter === category.id
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {searchQuery.length === 0 ? (
            <div className="p-6 space-y-6">
              {/* Recent Searches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSubmit(search)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                  Trending Now
                </h3>
                <div className="space-y-2">
                  {trendingSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSubmit(search)}
                      className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Searching for delicious options...</p>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Found {searchResults.length} results for "{searchQuery}"
                  </h3>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Utensils className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {result.name}
                          </h4>
                          {result.price && (
                            <span className="text-lg font-bold text-green-600">{result.price}</span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{result.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{result.deliveryTime}</span>
                          </div>
                          {result.distance && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{result.distance}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find anything matching "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}