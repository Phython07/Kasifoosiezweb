import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, Truck, ChefHat, Package, Star, Phone, MessageCircle, Navigation, Zap } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface OrderStatus {
  id: string;
  status: 'confirmed' | 'preparing' | 'ready' | 'picked-up' | 'delivered';
  timestamp: Date;
  message: string;
}

interface LiveOrder {
  id: string;
  restaurant: string;
  items: string[];
  total: string;
  estimatedTime: number;
  currentStatus: OrderStatus['status'];
  driverName?: string;
  driverRating?: number;
  driverPhone?: string;
  statuses: OrderStatus[];
  restaurantLocation: [number, number];
  customerLocation: [number, number];
  driverLocation: [number, number];
}

export default function LiveOrderTracker() {
  const [orders, setOrders] = useState<LiveOrder[]>([
    {
      id: 'KF2024001',
      restaurant: 'Pizza Palace',
      items: ['Margherita Pizza', 'Garlic Bread', 'Coke'],
      total: 'R189',
      estimatedTime: 25,
      currentStatus: 'preparing',
      restaurantLocation: [-26.2041, 28.0473], // Johannesburg
      customerLocation: [-26.1951, 28.0567],
      driverLocation: [-26.2020, 28.0500],
      statuses: [
        {
          id: '1',
          status: 'confirmed',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          message: 'Order confirmed by restaurant'
        },
        {
          id: '2',
          status: 'preparing',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          message: 'Chef is preparing your delicious meal'
        }
      ]
    },
    {
      id: 'KF2024002',
      restaurant: 'Burger Junction',
      items: ['Classic Burger', 'Fries', 'Milkshake'],
      total: 'R145',
      estimatedTime: 15,
      currentStatus: 'picked-up',
      driverName: 'John Mthembu',
      driverRating: 4.9,
      driverPhone: '+27 11 123 4567',
      restaurantLocation: [-26.2041, 28.0473],
      customerLocation: [-26.1951, 28.0567],
      driverLocation: [-26.2000, 28.0520],
      statuses: [
        {
          id: '1',
          status: 'confirmed',
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          message: 'Order confirmed'
        },
        {
          id: '2',
          status: 'preparing',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          message: 'Preparing your order'
        },
        {
          id: '3',
          status: 'ready',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          message: 'Order ready for pickup'
        },
        {
          id: '4',
          status: 'picked-up',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          message: 'Driver picked up your order'
        }
      ]
    },
    {
      id: 'KF2024003',
      restaurant: 'Sushi Express',
      items: ['California Roll', 'Salmon Sashimi', 'Miso Soup'],
      total: 'R245',
      estimatedTime: 30,
      currentStatus: 'confirmed',
      restaurantLocation: [-26.2041, 28.0473],
      customerLocation: [-26.1951, 28.0567],
      driverLocation: [-26.2041, 28.0473],
      statuses: [
        {
          id: '1',
          status: 'confirmed',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          message: 'Order confirmed by restaurant'
        }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string>(orders[0]?.id || '');

  const statusIcons = {
    confirmed: <CheckCircle className="h-5 w-5" />,
    preparing: <ChefHat className="h-5 w-5" />,
    ready: <Package className="h-5 w-5" />,
    'picked-up': <Truck className="h-5 w-5" />,
    delivered: <MapPin className="h-5 w-5" />
  };

  const statusColors = {
    confirmed: 'text-blue-500 bg-blue-100',
    preparing: 'text-orange-500 bg-orange-100',
    ready: 'text-purple-500 bg-purple-100',
    'picked-up': 'text-green-500 bg-green-100',
    delivered: 'text-gray-500 bg-gray-100'
  };

  const currentOrder = orders.find(order => order.id === selectedOrder);

  // Simulate order progress and driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.currentStatus === 'delivered') return order;

          const statusProgression: OrderStatus['status'][] = ['confirmed', 'preparing', 'ready', 'picked-up', 'delivered'];
          const currentIndex = statusProgression.indexOf(order.currentStatus);
          
          // Simulate driver movement
          let newDriverLocation = order.driverLocation;
          if (order.currentStatus === 'picked-up') {
            // Move driver towards customer
            const [driverLat, driverLng] = order.driverLocation;
            const [customerLat, customerLng] = order.customerLocation;
            const moveSpeed = 0.0001; // Small movement per update
            
            const latDiff = customerLat - driverLat;
            const lngDiff = customerLng - driverLng;
            
            if (Math.abs(latDiff) > moveSpeed || Math.abs(lngDiff) > moveSpeed) {
              newDriverLocation = [
                driverLat + (latDiff > 0 ? moveSpeed : -moveSpeed),
                driverLng + (lngDiff > 0 ? moveSpeed : -moveSpeed)
              ];
            }
          }
          
          if (currentIndex < statusProgression.length - 1 && Math.random() > 0.8) {
            const nextStatus = statusProgression[currentIndex + 1];
            const newStatus: OrderStatus = {
              id: Date.now().toString(),
              status: nextStatus,
              timestamp: new Date(),
              message: getStatusMessage(nextStatus)
            };

            return {
              ...order,
              currentStatus: nextStatus,
              statuses: [...order.statuses, newStatus],
              estimatedTime: Math.max(0, order.estimatedTime - 5),
              driverLocation: newDriverLocation
            };
          }

          return {
            ...order,
            estimatedTime: Math.max(0, order.estimatedTime - 1),
            driverLocation: newDriverLocation
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = (status: OrderStatus['status']): string => {
    const messages = {
      confirmed: 'Order confirmed by restaurant',
      preparing: 'Chef is preparing your delicious meal',
      ready: 'Order ready for pickup',
      'picked-up': 'Driver picked up your order',
      delivered: 'Order delivered successfully!'
    };
    return messages[status];
  };

  const getProgressPercentage = (status: OrderStatus['status']): number => {
    const statusProgression: OrderStatus['status'][] = ['confirmed', 'preparing', 'ready', 'picked-up', 'delivered'];
    const index = statusProgression.indexOf(status);
    return ((index + 1) / statusProgression.length) * 100;
  };

  if (!currentOrder) return null;

  // Create route line from restaurant to customer via driver
  const routeCoordinates = [
    currentOrder.restaurantLocation,
    currentOrder.driverLocation,
    currentOrder.customerLocation
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200/30 rounded-full animate-float-reverse-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
            <Truck className="h-4 w-4 mr-2 animate-bounce-gentle" />
            Live Order Tracking
            <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Track Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-text-shimmer">
              Order
            </span>{' '}
            in Real-Time
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with live tracking from kitchen to your door. Know exactly when your delicious meal will arrive.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Order Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Active Orders</h3>
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedOrder === order.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 text-sm">#{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[order.currentStatus]}`}>
                    {order.currentStatus.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">{order.restaurant}</div>
                <div className="text-lg font-bold text-green-600">{order.total}</div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  ETA: {order.estimatedTime} min
                </div>
              </div>
            ))}
          </div>

          {/* Order Details and Map */}
          <div className="lg:col-span-3 space-y-8">
            {/* Order Header */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Order #{currentOrder.id}</h3>
                  <p className="text-gray-600">{currentOrder.restaurant}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{currentOrder.total}</div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {currentOrder.estimatedTime} min
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Order Progress</span>
                  <span className="text-sm text-gray-500">
                    {Math.round(getProgressPercentage(currentOrder.currentStatus))}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out animate-expand-width"
                    style={{ width: `${getProgressPercentage(currentOrder.currentStatus)}%` }}
                  ></div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver Info (if available) */}
              {currentOrder.driverName && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-green-600" />
                    Your Driver
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {currentOrder.driverName.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{currentOrder.driverName}</h5>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{currentOrder.driverRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Map */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-gray-900 flex items-center">
                    <Navigation className="h-6 w-6 mr-2 text-blue-600 animate-pulse" />
                    Live Tracking Map
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live Updates</span>
                  </div>
                </div>
              </div>
              
              <div className="h-96 relative">
                <MapContainer
                  center={currentOrder.driverLocation}
                  zoom={14}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-b-3xl"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Restaurant Marker */}
                  <Marker position={currentOrder.restaurantLocation}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900">{currentOrder.restaurant}</h3>
                        <p className="text-sm text-gray-600">Restaurant Location</p>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Customer Marker */}
                  <Marker position={currentOrder.customerLocation}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900">Your Location</h3>
                        <p className="text-sm text-gray-600">Delivery Address</p>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Driver Marker */}
                  <Marker position={currentOrder.driverLocation}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900">
                          {currentOrder.driverName || 'Driver'}
                        </h3>
                        <p className="text-sm text-gray-600">Current Location</p>
                        <div className="flex items-center justify-center mt-2">
                          <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-xs text-gray-500">ETA: {currentOrder.estimatedTime} min</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Route Line */}
                  <Polyline
                    positions={routeCoordinates}
                    color="blue"
                    weight={4}
                    opacity={0.7}
                    dashArray="10, 10"
                  />
                </MapContainer>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Restaurant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Driver</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Your Location</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
              <h4 className="font-semibold text-gray-900 mb-6">Order Timeline</h4>
              <div className="space-y-4">
                {currentOrder.statuses.map((status, index) => (
                  <div key={status.id} className="flex items-start space-x-4 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[status.status]} animate-bounce-gentle`}>
                      {statusIcons[status.status]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-gray-900 capitalize">
                          {status.status.replace('-', ' ')}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {status.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{status.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}