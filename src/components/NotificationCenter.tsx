import React, { useState, useEffect } from 'react';
import { Bell, X, Gift, Truck, Star, Clock, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon: React.ReactNode;
  color: string;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'promotion',
      title: '🎉 50% OFF Weekend Special!',
      message: 'Get 50% off on all orders above R150 this weekend. Use code: WEEKEND50',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      icon: <Gift className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-pink-500 to-rose-500'
    },
    {
      id: '2',
      type: 'order',
      title: 'Order Delivered Successfully! 🚚',
      message: 'Your order #KF2024 has been delivered. Hope you enjoyed your meal!',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      icon: <Truck className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      id: '3',
      type: 'achievement',
      title: '⭐ You\'re a VIP Customer!',
      message: 'Congratulations! You\'ve unlocked VIP status with 10+ orders. Enjoy exclusive perks!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      icon: <Star className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      id: '4',
      type: 'system',
      title: '🔄 App Update Available',
      message: 'New features and improvements are available. Update now for the best experience!',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          type: 'order' as const,
          title: '🍕 Order Confirmed!',
          message: 'Your order from Pizza Palace is being prepared. ETA: 25 minutes',
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
        },
        {
          type: 'promotion' as const,
          title: '🎯 Flash Sale Alert!',
          message: 'Limited time: Free delivery on orders above R100. Hurry!',
          icon: <AlertCircle className="h-5 w-5" />,
          color: 'bg-gradient-to-r from-red-500 to-pink-500'
        }
      ];

      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...randomNotification,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-6 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-40 animate-bounce-gentle"
      >
        <Bell className="h-6 w-6 text-white animate-pulse" />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-ping">
            <span className="text-xs font-bold text-white">{unreadCount}</span>
          </div>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed top-20 right-6 w-96 max-h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 animate-slide-in-right overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Notifications</h3>
                <p className="text-yellow-100 text-sm">
                  {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up! 🎉'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No notifications yet</p>
                <p className="text-sm">We'll notify you when something important happens!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-all duration-300 cursor-pointer group ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${notification.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {notification.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors ${
                            !notification.read ? 'font-bold' : ''
                          }`}>
                            {notification.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {getTimeAgo(notification.timestamp)}
                          </span>
                          
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </>
  );
}