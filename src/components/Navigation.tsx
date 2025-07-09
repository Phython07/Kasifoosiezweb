import React, { useState } from 'react';
import { Menu, X, Utensils, Home, Users, Mail, Shield, UserX, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home', icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'About Us', id: 'about', icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Contact', id: 'contact', icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Privacy Policy', id: 'privacy', icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Account Deletion', id: 'account-deletion', icon: <UserX className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Enhanced Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
            onClick={() => onPageChange('home')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-full animate-pulse-glow"></div>
              <div className="relative bg-black p-2 sm:p-3 rounded-full group-hover:bg-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                <Utensils className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 group-hover:text-black transition-colors duration-300 animate-bounce-gentle" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold italic text-black group-hover:text-white transition-all duration-300 transform group-hover:scale-105 animate-text-shimmer bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text">
                KasiFoodies
              </span>
              <div className="hidden sm:flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="h-3 w-3 text-black animate-pulse" />
                <span className="text-xs text-black font-medium">Premium Delivery</span>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex space-x-1 xl:space-x-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`group relative px-3 xl:px-6 py-2 xl:py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-1 xl:space-x-2 text-sm xl:text-base ${
                  currentPage === item.id
                    ? 'bg-black text-yellow-400 shadow-2xl animate-glow-pulse'
                    : 'text-black hover:text-white hover:bg-black/20 hover:shadow-lg backdrop-blur-sm'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  currentPage === item.id 
                    ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-100' 
                    : 'bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100'
                }`}></div>
                
                {/* Icon with Animation */}
                <div className={`relative z-10 transition-all duration-300 ${
                  currentPage === item.id 
                    ? 'animate-bounce-gentle' 
                    : 'group-hover:animate-spin-slow-hover'
                }`}>
                  {item.icon}
                </div>
                
                {/* Text */}
                <span className="relative z-10 hidden xl:inline">{item.name}</span>
                
                {/* Active Indicator */}
                {currentPage === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300"></div>
              </button>
            ))}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative text-black hover:text-white p-2 sm:p-3 rounded-2xl transition-all duration-300 hover:bg-black/20 transform hover:scale-110 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 animate-spin-slow-hover" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce-gentle" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 sm:pb-6 animate-slide-in-left">
            <div className="flex flex-col space-y-2 sm:space-y-3 bg-black/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 mt-4 border border-white/20">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`group relative px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium text-left transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 sm:space-x-3 animate-fade-in-up text-sm sm:text-base ${
                    currentPage === item.id
                      ? 'bg-black text-yellow-400 shadow-xl'
                      : 'text-black hover:text-white hover:bg-black/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Effect */}
                  <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    currentPage === item.id 
                      ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-100' 
                      : 'bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100'
                  }`}></div>
                  
                  {/* Icon */}
                  <div className={`relative z-10 transition-all duration-300 ${
                    currentPage === item.id 
                      ? 'animate-bounce-gentle' 
                      : 'group-hover:animate-pulse'
                  }`}>
                    {item.icon}
                  </div>
                  
                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active Indicator */}
                  {currentPage === item.id && (
                    <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}