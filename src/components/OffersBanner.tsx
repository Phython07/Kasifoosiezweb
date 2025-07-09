import React, { useState, useEffect } from 'react';
import { X, Gift, Clock, Zap, Percent, Star, ArrowRight } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  expiresAt: Date;
  type: 'flash' | 'weekend' | 'new-user' | 'loyalty';
  color: string;
  icon: React.ReactNode;
}

export default function OffersBanner() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  const offers: Offer[] = [
    {
      id: '1',
      title: '⚡ FLASH SALE',
      description: 'Free delivery on all orders',
      discount: '100%',
      code: 'FLASH24',
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      type: 'flash',
      color: 'bg-gradient-to-r from-red-500 to-pink-600',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: '2',
      title: '🎉 WEEKEND SPECIAL',
      description: 'Get 50% off on orders above R150',
      discount: '50%',
      code: 'WEEKEND50',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      type: 'weekend',
      color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      icon: <Gift className="h-4 w-4" />
    },
    {
      id: '3',
      title: '⭐ VIP EXCLUSIVE',
      description: '30% off for loyal customers',
      discount: '30%',
      code: 'VIP30',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      type: 'loyalty',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-600',
      icon: <Star className="h-4 w-4" />
    }
  ];

  const currentOffer = offers[currentOfferIndex];

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [offers.length]);

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = currentOffer.expiresAt.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft('EXPIRED');
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [currentOffer]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-16 left-0 right-0 ${currentOffer.color} text-white z-40 animate-slide-down`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4 flex-1">
            {/* Offer Icon */}
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce-gentle">
              {currentOffer.icon}
            </div>

            {/* Offer Content */}
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-lg animate-text-shimmer">
                  {currentOffer.title}
                </h3>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold animate-pulse-gentle">
                  {currentOffer.discount} OFF
                </span>
              </div>
              <p className="text-sm opacity-90">{currentOffer.description}</p>
            </div>

            {/* Code and Timer */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <div className="text-xs opacity-75">USE CODE</div>
                  <div className="font-bold text-lg">{currentOffer.code}</div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <div className="text-xs opacity-75 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    EXPIRES IN
                  </div>
                  <div className="font-bold text-lg font-mono">{timeLeft}</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 animate-glow-pulse">
              <span>Order Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center ml-4 transition-all duration-300 transform hover:scale-110"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex space-x-2 pb-2">
          {offers.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index === currentOfferIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Code Display */}
      <div className="md:hidden bg-black/20 px-4 py-2 text-center">
        <span className="text-sm">Use code: </span>
        <span className="font-bold">{currentOffer.code}</span>
        <span className="text-sm ml-4">⏰ {timeLeft}</span>
      </div>
    </div>
  );
}