import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Clock, Shield, Users, Smartphone, Download, Store, ChefHat, Truck, Zap, Heart, Award, MapPin, Bell, CreditCard, Headphones, TrendingUp, Globe, CheckCircle, Play, Video, Sparkles, MessageCircle, Gift, Percent, Timer, Phone, Mail, Calendar, Search, Filter, ShoppingCart, Bookmark, Share2, ThumbsUp, Camera, Mic, Volume2, Settings, User, Navigation, Wifi, Battery, Signal } from 'lucide-react';
import VideoModal from './VideoModal';
import LiveChat from './LiveChat';
import NotificationCenter from './NotificationCenter';
import SearchModal from './SearchModal';
import TestimonialCarousel from './TestimonialCarousel';
import LiveOrderTracker from './LiveOrderTracker';
import WeatherWidget from './WeatherWidget';
import SocialProof from './SocialProof';

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'AI-Powered Recommendations',
      description: 'Smart food suggestions based on your preferences and order history',
      badge: 'NEW'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Premium Quality Assurance',
      description: 'Every restaurant verified with 4.5+ ratings and quality inspections',
      badge: 'VERIFIED'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Contactless & Safe',
      description: 'Zero-contact delivery with real-time health safety protocols',
      badge: 'SAFE'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Community Impact',
      description: 'Supporting 500+ local businesses and creating 1000+ jobs',
      badge: 'IMPACT'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: <Users className="h-6 w-6" />, trend: '+15%' },
    { number: '500+', label: 'Partner Restaurants', icon: <Store className="h-6 w-6" />, trend: '+25%' },
    { number: '18min', label: 'Average Delivery', icon: <Clock className="h-6 w-6" />, trend: '-7min' },
    { number: '4.9★', label: 'App Rating', icon: <Star className="h-6 w-6" />, trend: '+0.2' }
  ];

  const customerFeatures = [
    { icon: <MapPin className="h-6 w-6" />, text: 'GPS tracking & live updates', premium: true },
    { icon: <Bell className="h-6 w-6" />, text: 'Smart push notifications', premium: false },
    { icon: <CreditCard className="h-6 w-6" />, text: 'Multiple payment options', premium: false },
    { icon: <Headphones className="h-6 w-6" />, text: '24/7 premium support', premium: true }
  ];

  const businessFeatures = [
    { icon: <TrendingUp className="h-6 w-6" />, text: 'Advanced analytics dashboard', premium: true },
    { icon: <Globe className="h-6 w-6" />, text: 'Multi-location management', premium: true },
    { icon: <CheckCircle className="h-6 w-6" />, text: 'Automated order processing', premium: false },
    { icon: <CreditCard className="h-6 w-6" />, text: 'Instant payment settlements', premium: false }
  ];

  const liveMetrics = [
    { label: 'Orders Today', value: '2,847', change: '+12%', color: 'text-green-500' },
    { label: 'Active Drivers', value: '156', change: '+8%', color: 'text-blue-500' },
    { label: 'Avg Response', value: '2.3s', change: '-0.5s', color: 'text-purple-500' },
    { label: 'Customer Satisfaction', value: '98.7%', change: '+1.2%', color: 'text-yellow-500' }
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Hero Section with Enhanced Features */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-300 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-orange-400/30 rounded-full animate-float-reverse-slow"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-500/40 rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-20 right-40 w-24 h-24 bg-white/10 rounded-full animate-pulse-gentle"></div>
          
          {/* Floating Icons */}
          <div className="absolute top-32 left-1/4 animate-float-icon">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-32 right-1/4 animate-float-icon-reverse">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Truck className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-sm font-medium text-black animate-fade-in-up backdrop-blur-sm">
                    <Star className="h-4 w-4 mr-2 text-yellow-600 animate-spin-slow-hover" />
                    #1 Food Delivery App in SA
                    <Sparkles className="h-4 w-4 ml-2 text-yellow-600 animate-pulse" />
                  </div>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm group"
                  >
                    <Search className="h-5 w-5 text-black group-hover:animate-bounce-gentle" />
                  </button>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight">
                  Craving{' '}
                  <span className="relative">
                    <span className="text-white drop-shadow-lg animate-text-shimmer bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text">
                      Delicious
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent animate-expand-width"></div>
                  </span>{' '}
                  Food?
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed max-w-lg animate-slide-up delay-200">
                  Order from 500+ local restaurants with AI-powered recommendations and get fresh, hot meals delivered in under 20 minutes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-400">
                <a 
                  href="https://play.google.com/store/apps/details?id=za.co.cyber.systems&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-black text-yellow-400 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl flex items-center justify-center space-x-3 animate-glow-pulse overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Download className="h-6 w-6 group-hover:animate-bounce-gentle relative z-10" />
                  <span className="relative z-10">Download Customer App</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                </a>
                
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group border-2 border-black text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-black hover:text-yellow-400 transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl flex items-center justify-center space-x-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center space-x-2">
                    <div className="relative">
                      <Play className="h-5 w-5 group-hover:animate-pulse" />
                      <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    <span>Watch Demo</span>
                    <Video className="h-4 w-4 group-hover:animate-bounce-gentle" />
                  </div>
                </button>
              </div>

              {/* Enhanced Stats with Trends */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 animate-fade-in-up delay-600">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20">
                    <div className="flex items-center justify-center mb-2 text-black group-hover:text-white transition-colors duration-300 relative">
                      <div className="absolute inset-0 bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
                      <div className="relative z-10 group-hover:animate-bounce-gentle">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300 group-hover:text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-700 group-hover:text-gray-200 transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="text-xs text-green-600 font-semibold mt-1 group-hover:text-green-300">
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Metrics Dashboard */}
              <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 animate-fade-in-up delay-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-black flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Live Metrics
                  </h3>
                  <div className="text-xs text-gray-700">Updated now</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {liveMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-black">{metric.value}</div>
                      <div className="text-xs text-gray-700">{metric.label}</div>
                      <div className={`text-xs font-semibold ${metric.color}`}>{metric.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced App Showcase */}
            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative">
                {/* Main Phone */}
                <div className="relative w-80 h-96 lg:w-96 lg:h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 overflow-hidden animate-float-phone border-8 border-gray-800">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full"></div>
                  <div className="absolute top-4 right-6 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  
                  <img 
                    src="/Food_Delivery_App_Development1.png" 
                    alt="KasiFoodies Customer App Interface" 
                    className="w-full h-full object-cover rounded-[2.5rem] hover:scale-110 transition-transform duration-700 p-2"
                  />
                  
                  {/* Screen Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-yellow-400/20 rounded-[2.5rem] animate-pulse-glow"></div>
                  
                  {/* Interactive Screen Elements */}
                  <div className="absolute bottom-20 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 animate-slide-up-repeat">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800">Order #KF2024</div>
                        <div className="text-xs text-gray-600">Arriving in 12 minutes</div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className="bg-green-500 h-1 rounded-full animate-expand-width" style={{width: '75%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating UI Elements */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-xl flex items-center justify-center animate-bounce-float rotate-12 hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                  <CheckCircle className="h-10 w-10 text-white animate-pulse group-hover:animate-bounce-gentle" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                    <span className="text-xs font-bold text-black">✓</span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-xl flex items-center justify-center animate-bounce-float-reverse -rotate-12 hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                  <Heart className="h-10 w-10 text-white animate-pulse delay-300 group-hover:animate-bounce-gentle" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </div>

                <div className="absolute top-1/2 -left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl flex items-center justify-center animate-spin-slow-hover group cursor-pointer">
                  <Truck className="h-8 w-8 text-white group-hover:animate-bounce-gentle" />
                </div>

                <div className="absolute top-1/4 -right-8 w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-xl flex items-center justify-center animate-ping-slow group cursor-pointer">
                  <Bell className="h-7 w-7 text-white group-hover:animate-bounce-gentle" />
                </div>

                {/* Voice Assistant Indicator */}
                <div className="absolute top-16 right-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-3 shadow-lg animate-pulse-gentle group cursor-pointer">
                  <Mic className="h-5 w-5 text-white group-hover:animate-bounce-gentle" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Social Proof Section */}
      <SocialProof />

      {/* Live Order Tracker */}
      <LiveOrderTracker />

      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      {/* Shop Owner Section - Enhanced */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/10 rounded-full animate-float-reverse-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-400/10 rounded-full animate-bounce-gentle"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8 animate-slide-in-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-blue-200 animate-fade-in-up backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 mr-2 animate-bounce-gentle" />
                Grow Your Business 10x Faster
                <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <Store className="h-16 w-16 text-yellow-400 animate-bounce-gentle" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-xs font-bold text-white">+</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      Restaurant Owner?
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2 animate-expand-width"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-blue-100 animate-slide-up delay-200">
                  Transform Your Restaurant into a Digital Powerhouse
                </h3>
                
                <p className="text-xl text-blue-100 leading-relaxed animate-slide-up delay-300">
                  Join 500+ successful restaurants already growing their revenue by 300% with our AI-powered restaurant management platform. Get real-time orders, predictive analytics, and customer insights.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up delay-400">
                {businessFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-blue-100 group hover:text-white transition-colors duration-300 cursor-pointer">
                    <div className="text-yellow-400 group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce-gentle">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium flex items-center">
                      {feature.text}
                      {feature.premium && (
                        <span className="ml-2 px-2 py-1 bg-yellow-400 text-black text-xs rounded-full font-bold">PRO</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-500">
                <a 
                  href="https://play.google.com/store/apps/details?id=za.co.cyber.food.ordering.service&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4 rounded-2xl text-lg font-bold hover:from-yellow-300 hover:to-orange-300 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl flex items-center justify-center space-x-3 animate-glow-pulse overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                  <Store className="h-6 w-6 relative z-10 group-hover:animate-bounce-gentle" />
                  <span className="relative z-10">Register Your Restaurant</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                </a>

                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-purple-900 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm flex items-center justify-center space-x-2"
                >
                  <Play className="h-5 w-5 group-hover:animate-pulse" />
                  <span>See Success Stories</span>
                </button>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="relative w-full max-w-md mx-auto">
                  <img 
                    src="/Restaurant-App.png" 
                    alt="KasiFoodies Shop Owner App" 
                    className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700 animate-float-reverse border-4 border-white/20"
                  />
                  
                  {/* Success Metrics Overlay */}
                  <div className="absolute -top-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-slide-down-repeat hover:shadow-2xl transition-shadow duration-300 cursor-pointer group">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 group-hover:animate-bounce-gentle" />
                      <span className="text-sm font-bold">+300% Revenue</span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg animate-slide-up-repeat hover:shadow-2xl transition-shadow duration-300 cursor-pointer group">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 group-hover:animate-bounce-gentle" />
                      <span className="text-sm font-bold">1000+ Orders/Month</span>
                    </div>
                  </div>

                  {/* AI Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse-gentle">
                    AI POWERED
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 right-8 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-xl flex items-center justify-center animate-spin-slow-hover group cursor-pointer">
                  <Award className="h-8 w-8 text-white group-hover:animate-bounce-gentle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400 to-orange-400"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-yellow-800 mb-6">
              <Zap className="h-4 w-4 mr-2 animate-bounce-gentle" />
              Why 50,000+ Users Choose KasiFoodies
              <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Experience the{' '}
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent animate-text-shimmer">
                Future
              </span>{' '}
              of Food Delivery
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI technology meets exceptional service to bring you the most advanced food delivery experience in South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-3xl hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl animate-fade-in-up border border-gray-100 hover:border-yellow-200 overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Badge */}
                {feature.badge && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full animate-pulse-gentle">
                    {feature.badge}
                  </div>
                )}

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-yellow-600 group-hover:text-yellow-700 mb-6 group-hover:scale-110 transition-all duration-300 flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl group-hover:bg-yellow-200 group-hover:rotate-6 group-hover:animate-bounce-gentle">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-300 rounded-3xl transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced App Download CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/10 rounded-full animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-full animate-spin-ultra-slow"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-10">
          <div className="mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 rounded-full text-sm font-medium text-yellow-400 mb-8 backdrop-blur-sm">
              <Download className="h-4 w-4 mr-2 animate-bounce-gentle" />
              Join 50,000+ Happy Customers
              <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-text-shimmer">
                Transform
              </span>{' '}
              Your Experience?
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose your journey - order delicious food as a customer or grow your restaurant business with our AI-powered platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Enhanced Customer App Card */}
            <div className="group relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 p-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-slide-in-left overflow-hidden cursor-pointer">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
              
              <div className="relative z-10 text-black">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <Smartphone className="h-20 w-20 animate-bounce-gentle" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">For Food Lovers</h3>
                <p className="mb-6 text-lg leading-relaxed">Discover amazing local restaurants with AI recommendations and get your favorite meals delivered fresh to your door</p>
                
                <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
                  {customerFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-black/70 group-hover:animate-bounce-gentle" style={{ animationDelay: `${index * 100}ms` }}>
                        {feature.icon}
                      </div>
                      <span className="flex items-center">
                        {feature.text}
                        {feature.premium && (
                          <span className="ml-1 px-1 py-0.5 bg-black text-yellow-400 text-xs rounded font-bold">PRO</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="https://play.google.com/store/apps/details?id=za.co.cyber.systems&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative bg-black text-yellow-400 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 w-full animate-glow-pulse overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <Download className="h-6 w-6 relative z-10 group-hover/btn:animate-bounce-gentle" />
                  <span className="relative z-10">Download Customer App</span>
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300 relative z-10" />
                </a>
              </div>
            </div>

            {/* Enhanced Shop Owner App Card */}
            <div className="group relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-slide-in-right overflow-hidden cursor-pointer">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
              
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <Store className="h-20 w-20 animate-bounce-gentle delay-200" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">For Restaurant Owners</h3>
                <p className="mb-6 text-lg leading-relaxed text-blue-100">Grow your restaurant business with our AI-powered management platform and reach thousands of customers</p>
                
                <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
                  {businessFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-blue-100 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-blue-200 group-hover:animate-bounce-gentle" style={{ animationDelay: `${index * 100}ms` }}>
                        {feature.icon}
                      </div>
                      <span className="flex items-center">
                        {feature.text}
                        {feature.premium && (
                          <span className="ml-1 px-1 py-0.5 bg-yellow-400 text-black text-xs rounded font-bold">PRO</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="https://play.google.com/store/apps/details?id=za.co.cyber.food.ordering.service&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative bg-white text-purple-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 w-full animate-glow-pulse overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <Store className="h-6 w-6 relative z-10 group-hover/btn:animate-bounce-gentle" />
                  <span className="relative z-10">Register Your Restaurant</span>
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300 relative z-10" />
                </a>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 animate-fade-in-up delay-800">
            <div className="flex items-center space-x-2 group cursor-pointer hover:text-white transition-colors duration-300">
              <Shield className="h-5 w-5 group-hover:animate-bounce-gentle" />
              <span className="text-sm">Secure & Trusted</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-pointer hover:text-yellow-400 transition-colors duration-300">
              <Star className="h-5 w-5 text-yellow-400 group-hover:animate-bounce-gentle" />
              <span className="text-sm">4.9/5 App Store Rating</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-pointer hover:text-white transition-colors duration-300">
              <Users className="h-5 w-5 group-hover:animate-bounce-gentle" />
              <span className="text-sm">50,000+ Downloads</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-pointer hover:text-white transition-colors duration-300">
              <Award className="h-5 w-5 group-hover:animate-bounce-gentle" />
              <span className="text-sm">Award Winning Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-40">
        {/* Live Chat Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-bounce-gentle"
        >
          <MessageCircle className="h-6 w-6 text-white group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </button>

        {/* Share Button */}
        <button className="group w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300">
          <Share2 className="h-6 w-6 text-white group-hover:animate-bounce-gentle" />
        </button>

        {/* Bookmark Button */}
        <button className="group w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300">
          <Bookmark className="h-6 w-6 text-white group-hover:animate-bounce-gentle" />
        </button>
      </div>

      {/* Notification Bell */}
      <NotificationCenter />

      {/* Modals */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}