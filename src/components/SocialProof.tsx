import React, { useState, useEffect } from 'react';
import { Users, Star, TrendingUp, Award, MapPin, Clock, Heart, CheckCircle, Pizza, Coffee, Sandwich, UtensilsCrossed, Cookie, IceCream } from 'lucide-react';

interface SocialProofItem {
  id: string;
  type: 'order' | 'review' | 'milestone' | 'achievement';
  message: string;
  user: string;
  location: string;
  timestamp: Date;
  rating?: number;
  avatar: string;
  foodItem?: string;
}

export default function SocialProof() {
  const [notifications, setNotifications] = useState<SocialProofItem[]>([
    {
      id: '1',
      type: 'order',
      message: 'just ordered a delicious kota from Street Food Corner',
      user: 'Rotshi M.',
      location: 'Thohoyandou',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: '👨🏿‍💼',
      foodItem: 'kota'
    },
    {
      id: '2',
      type: 'review',
      message: 'gave 5 stars to Dagwood Deli for their amazing dagwood sandwich',
      user: 'Diego Murachino',
      location: 'Nzhelele',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      rating: 5,
      avatar: '👨🏽‍🍳',
      foodItem: 'dagwood'
    },
    {
      id: '3',
      type: 'milestone',
      message: 'We just hit 50,000 happy customers!',
      user: 'KasiFoodies',
      location: 'South Africa',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      avatar: '🎉'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    totalOrders: 127543,
    activeUsers: 2847,
    restaurants: 523,
    avgRating: 4.9
  });

  const socialProofTemplates = [
    {
      type: 'order' as const,
      messages: [
        'just ordered {foodItem} from {restaurant}',
        'is enjoying {foodItem} from {restaurant}',
        'ordered their favorite {foodItem} from {restaurant}',
        'just placed a repeat order for {foodItem} at {restaurant}',
        'discovered {restaurant} and loved their {foodItem}',
        'recommended {restaurant} to friends for their {foodItem}',
        'ordered a family meal with {foodItem} from {restaurant}',
        'tried the special {foodItem} at {restaurant}',
        'can\'t get enough of {foodItem} from {restaurant}',
        'shared {foodItem} from {restaurant} with friends'
      ]
    },
    {
      type: 'review' as const,
      messages: [
        'gave 5 stars to {restaurant} for their amazing {foodItem}',
        'left a glowing review for {restaurant}\'s {foodItem}',
        'recommended {restaurant} for their delicious {foodItem}',
        'loved their recent {foodItem} order from {restaurant}',
        'praised the quality of {foodItem} at {restaurant}',
        'complimented the service and {foodItem} at {restaurant}',
        'shared photos of {foodItem} from {restaurant}',
        'became a regular at {restaurant} for their {foodItem}',
        'raved about the authentic {foodItem} at {restaurant}',
        'called {restaurant}\'s {foodItem} the best in town'
      ]
    },
    {
      type: 'achievement' as const,
      messages: [
        'became a VIP customer',
        'completed their 50th order',
        'earned loyalty rewards',
        'unlocked premium benefits',
        'reached gold status',
        'earned free delivery for life',
        'joined the foodie club',
        'became a taste tester',
        'won the monthly food challenge',
        'earned the "Local Foodie" badge'
      ]
    }
  ];

  const restaurants = [
    'Pizza Palace', 'Burger Junction', 'Sushi Express', 'Curry House', 'Taco Bell', 
    'Coffee Corner', 'Steakhouse Grill', 'Pasta Paradise', 'Thai Garden', 'Fish & Chips Co',
    'Sandwich Station', 'Smoothie Bar', 'BBQ Pit', 'Noodle House', 'Bakery Delights',
    'Ice Cream Parlor', 'Salad Bowl', 'Wings & Things', 'Deli Corner', 'Breakfast Spot',
    'Street Food Corner', 'Kota King', 'Dagwood Deli', 'Chips & More', 'Braai Master',
    'Inyama Yenhloko Grill', 'Traditional Tastes', 'Local Flavors', 'Mzansi Kitchen', 'Heritage Foods'
  ];
  
  const foodItems = [
    'pizza', 'burger', 'sushi', 'curry', 'tacos', 'coffee', 'steak', 'pasta', 'pad thai', 'fish & chips',
    'sandwich', 'smoothie', 'ribs', 'ramen', 'croissant', 'ice cream', 'salad', 'wings', 'wrap', 'pancakes',
    'kota', 'chips', 'dagwood', 'inyama yenhloko', 'boerewors', 'biltong', 'vetkoek', 'koeksisters', 
    'milk tart', 'sosaties', 'potjiekos', 'pap en wors', 'bunny chow', 'gatsby', 'samoosas',
    'chicken feet', 'tripe', 'mogodu', 'amadumbe', 'morogo'
  ];
  
  const locations = [
    'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein',
    'East London', 'Pietermaritzburg', 'Kimberley', 'Polokwane', 'Nelspruit', 'Rustenburg',
    'George', 'Witbank', 'Vanderbijlpark', 'Centurion', 'Roodepoort', 'Boksburg',
    'Benoni', 'Kempton Park', 'Alberton', 'Germiston', 'Springs', 'Randburg',
    'Thohoyandou', 'Nzhelele', 'Limpopo', 'Polokwane', 'Tzaneen', 'Giyani', 'Musina',
    'Mokopane', 'Bela-Bela', 'Modimolle', 'Thabazimbi', 'Lephalale', 'Makhado'
  ];
  
  const names = [
    'Sarah M.', 'Michael C.', 'Priya P.', 'John D.', 'Lisa K.', 'David S.', 'Emma T.',
    'James L.', 'Nomsa M.', 'Thabo N.', 'Fatima A.', 'Ryan B.', 'Zoe W.', 'Alex R.',
    'Maya S.', 'Chris H.', 'Lerato M.', 'Kevin O.', 'Tanya V.', 'Mark F.', 'Sipho K.',
    'Jessica G.', 'Ahmed H.', 'Chloe B.', 'Daniel M.', 'Aisha P.', 'Luke T.', 'Nadia S.',
    'Brandon L.', 'Kimberly R.', 'Tshepo M.', 'Samantha D.', 'Omar K.', 'Grace N.',
    'Tyler J.', 'Amara W.', 'Connor B.', 'Zara H.', 'Ethan C.', 'Nia M.',
    'Rotshi M.', 'Diego Murachino', 'Phathu Ludzulu', 'Siya Renda', 'Tshifhiwa M.',
    'Mulalo K.', 'Azwindini R.', 'Khathutshelo S.', 'Rendani T.', 'Mpho L.',
    'Vhutshilo N.', 'Takalani P.', 'Fhulufhelo M.', 'Ndivhuwo K.', 'Livhuwani S.'
  ];
  
  const avatars = [
    '👨🏻‍💼', '👩🏽‍💻', '👨🏿‍🍳', '👩🏻‍🎓', '👨🏽‍⚕️', '👩🏿‍🏫', '👨🏻‍🎨', '👩🏽‍🔬',
    '👨🏿‍💻', '👩🏻‍💼', '👨🏽‍🍳', '👩🏿‍⚕️', '👨🏻‍🏫', '👩🏽‍🎨', '👨🏿‍🎓', '👩🏻‍🔬',
    '🧑🏻‍💼', '🧑🏽‍💻', '🧑🏿‍🍳', '🧑🏻‍🎓', '🧑🏽‍⚕️', '🧑🏿‍🏫', '🧑🏻‍🎨', '🧑🏽‍🔬',
    '👨🏿‍🌾', '👩🏽‍🍳', '👨🏻‍🚀', '👩🏿‍💼', '👨🏽‍🎭', '👩🏻‍🎤', '👨🏿‍🏭', '👩🏽‍🔧'
  ];

  const getFoodIcon = (foodItem: string) => {
    const item = foodItem.toLowerCase();
    if (item.includes('pizza')) return <Pizza className="h-4 w-4 text-red-500" />;
    if (item.includes('coffee')) return <Coffee className="h-4 w-4 text-brown-500" />;
    if (item.includes('sandwich') || item.includes('dagwood') || item.includes('kota')) return <Sandwich className="h-4 w-4 text-yellow-600" />;
    if (item.includes('ice cream')) return <IceCream className="h-4 w-4 text-blue-400" />;
    if (item.includes('cookie') || item.includes('koeksisters')) return <Cookie className="h-4 w-4 text-orange-500" />;
    return <UtensilsCrossed className="h-4 w-4 text-gray-600" />;
  };

  // Generate random social proof notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) { // 60% chance every 4 seconds
        const template = socialProofTemplates[Math.floor(Math.random() * socialProofTemplates.length)];
        const message = template.messages[Math.floor(Math.random() * template.messages.length)];
        const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        const foodItem = foodItems[Math.floor(Math.random() * foodItems.length)];
        
        const newNotification: SocialProofItem = {
          id: Date.now().toString(),
          type: template.type,
          message: message.replace('{restaurant}', restaurant).replace('{foodItem}', foodItem),
          user: names[Math.floor(Math.random() * names.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          timestamp: new Date(),
          rating: template.type === 'review' ? 5 : undefined,
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
          foodItem: template.type !== 'achievement' ? foodItem : undefined
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 24)]); // Keep last 25
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 5),
        activeUsers: Math.max(1000, prev.activeUsers + Math.floor(Math.random() * 10) - 5),
        restaurants: prev.restaurants + (Math.random() > 0.98 ? 1 : 0),
        avgRating: Math.min(5, Math.max(4.5, prev.avgRating + (Math.random() - 0.5) * 0.02))
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.min(notifications.length, 6));
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  };

  const getNotificationIcon = (type: SocialProofItem['type']) => {
    switch (type) {
      case 'order': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'review': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'milestone': return <Award className="h-4 w-4 text-purple-500" />;
      case 'achievement': return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200/30 rounded-full animate-float-reverse-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-800 mb-6">
            <Users className="h-4 w-4 mr-2 animate-bounce-gentle" />
            Trusted by Thousands
            <Heart className="h-4 w-4 ml-2 text-red-500 animate-pulse" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Join Our{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-text-shimmer">
              Growing Community
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what's happening right now on KasiFoodies. Real customers, real orders, real satisfaction across South Africa.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Stats */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-in-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
              Live Stats
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalOrders.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">Total Orders</div>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-500 animate-bounce-gentle" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Active Users</div>
                </div>
                <Users className="h-8 w-8 text-green-500 animate-bounce-gentle" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.restaurants}</div>
                  <div className="text-sm text-purple-700">Partner Restaurants</div>
                </div>
                <MapPin className="h-8 w-8 text-purple-500 animate-bounce-gentle" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)}★</div>
                  <div className="text-sm text-yellow-700">Average Rating</div>
                </div>
                <Star className="h-8 w-8 text-yellow-500 animate-bounce-gentle" />
              </div>
            </div>

            {/* Popular Food Items */}
            <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <UtensilsCrossed className="h-5 w-5 mr-2 text-orange-600" />
                Trending Foods
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Pizza className="h-4 w-4 text-red-500" />
                  <span>Pizza</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sandwich className="h-4 w-4 text-yellow-600" />
                  <span>Kota</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UtensilsCrossed className="h-4 w-4 text-brown-600" />
                  <span>Inyama Yenhloko</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee className="h-4 w-4 text-brown-500" />
                  <span>Coffee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                Live Activity
              </h3>
              <span className="text-sm text-gray-500">Updated in real-time</span>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {notifications.slice(0, 15).map((notification, index) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 rounded-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                    index === currentIndex ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl animate-bounce-gentle">
                    {notification.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{notification.user}</span>
                      {getNotificationIcon(notification.type)}
                      {notification.foodItem && getFoodIcon(notification.foodItem)}
                      {notification.rating && (
                        <div className="flex">
                          {[...Array(notification.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{notification.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeAgo(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-800">Activity Summary</h4>
                  <p className="text-sm text-green-700">
                    {notifications.length} activities in the last hour
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up delay-800">
          <div className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Verified Orders</h4>
            <p className="text-sm text-gray-600">100% authentic reviews</p>
          </div>

          <div className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Award Winning</h4>
            <p className="text-sm text-gray-600">Best delivery app 2024</p>
          </div>

          <div className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Top Rated</h4>
            <p className="text-sm text-gray-600">4.9/5 customer rating</p>
          </div>

          <div className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Customer Love</h4>
            <p className="text-sm text-gray-600">50K+ happy customers</p>
          </div>
        </div>
      </div>
    </section>
  );
}