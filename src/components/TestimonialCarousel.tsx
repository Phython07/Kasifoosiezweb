import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, User, MapPin, Heart, ThumbsUp } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  orderCount: number;
  avatar: string;
  verified: boolean;
  date: string;
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'Johannesburg',
      rating: 5,
      comment: 'KasiFoodies has completely changed how I order food! The delivery is always on time, and the food quality is exceptional. The AI recommendations are spot-on!',
      orderCount: 47,
      avatar: '👩🏽‍💼',
      verified: true,
      date: '2 days ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      location: 'Cape Town',
      rating: 5,
      comment: 'As a restaurant owner, KasiFoodies has increased our revenue by 300%! The platform is easy to use and their support team is amazing. Highly recommended!',
      orderCount: 156,
      avatar: '👨🏻‍🍳',
      verified: true,
      date: '1 week ago'
    },
    {
      id: '3',
      name: 'Nomsa Mthembu',
      location: 'Durban',
      rating: 5,
      comment: 'The variety of local restaurants is incredible! I love supporting local businesses through KasiFoodies. The app is so user-friendly and delivery is super fast.',
      orderCount: 23,
      avatar: '👩🏿‍💻',
      verified: true,
      date: '3 days ago'
    },
    {
      id: '4',
      name: 'David Williams',
      location: 'Pretoria',
      rating: 5,
      comment: 'Best food delivery service in SA! The real-time tracking is fantastic, and I love the loyalty rewards. Customer service is top-notch too!',
      orderCount: 89,
      avatar: '👨🏼‍💼',
      verified: true,
      date: '5 days ago'
    },
    {
      id: '5',
      name: 'Fatima Al-Rashid',
      location: 'Johannesburg',
      rating: 5,
      comment: 'KasiFoodies saved my dinner party! Last-minute order for 15 people, delivered perfectly on time. The quality was outstanding. Thank you!',
      orderCount: 34,
      avatar: '👩🏽‍🎓',
      verified: true,
      date: '1 day ago'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextTestimonial, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400/10 rounded-full animate-float-reverse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-400/5 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-yellow-400 mb-6 backdrop-blur-sm">
            <Heart className="h-4 w-4 mr-2 animate-bounce-gentle" />
            What Our Customers Say
            <Star className="h-4 w-4 ml-2 text-yellow-400 animate-pulse" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Real Stories from{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-text-shimmer">
              Happy Customers
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust KasiFoodies for their daily food delivery needs.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div 
          className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 animate-slide-up"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce-gentle">
            <Quote className="h-6 w-6 text-white" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Customer Info */}
            <div className="text-center lg:text-left">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-4xl mx-auto lg:mx-0 mb-4 animate-bounce-gentle">
                {currentTestimonial.avatar}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center lg:justify-start">
                {currentTestimonial.name}
                {currentTestimonial.verified && (
                  <div className="ml-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </h3>
              
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{currentTestimonial.location}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-300">
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">{currentTestimonial.orderCount}</div>
                  <div>Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">{currentTestimonial.rating}.0</div>
                  <div>Rating</div>
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="lg:col-span-2">
              {/* Rating Stars */}
              <div className="flex justify-center lg:justify-start mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current animate-bounce-gentle"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>

              {/* Comment */}
              <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-6 font-medium">
                "{currentTestimonial.comment}"
              </blockquote>

              {/* Date and Actions */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{currentTestimonial.date}</span>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
                    <ThumbsUp className="h-4 w-4 group-hover:animate-bounce-gentle" />
                    <span className="text-sm">Helpful</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
                    <Heart className="h-4 w-4 group-hover:animate-bounce-gentle" />
                    <span className="text-sm">Like</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 group"
            >
              <ChevronLeft className="h-6 w-6 group-hover:animate-bounce-gentle" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 group"
            >
              <ChevronRight className="h-6 w-6 group-hover:animate-bounce-gentle" />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Mini Testimonials Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in-up ${
                index === currentIndex ? 'ring-2 ring-yellow-400' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm line-clamp-3">
                {testimonial.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}