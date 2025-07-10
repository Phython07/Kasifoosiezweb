/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Gauge, CloudSnow, Zap, MapPin, ChevronDown, Search, Mountain, Trees, Building, Home, Factory, Waves, AlertCircle, RefreshCw } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  location: string;
  recommendation: string;
  description: string;
  feelsLike: number;
  icon: string;
  sunrise?: number;
  sunset?: number;
  uvIndex?: number;
}

interface Location {
  name: string;
  coordinates: [number, number];
  province: string;
  icon: React.ReactNode;
  description: string;
}

// OpenWeatherMap API configuration
// Environment variables (make sure these are set correctly in your .env file)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;




// Geolocation configuration
const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000 // 5 minutes
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    condition: 'clear',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    location: 'Johannesburg',
    recommendation: 'Loading weather data... 🌤️',
    description: 'Loading...',
    feelsLike: 26,
    icon: '01d'
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number, name: string} | null>(null);

  const locations: Location[] = [
    // Major Cities
    { name: 'Johannesburg', coordinates: [-26.2041, 28.0473], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'City of Gold' },
    { name: 'Cape Town', coordinates: [-33.9249, 18.4241], province: 'Western Cape', icon: <Mountain className="h-4 w-4" />, description: 'Mother City' },
    { name: 'Durban', coordinates: [-29.8587, 31.0218], province: 'KwaZulu-Natal', icon: <Waves className="h-4 w-4" />, description: 'Golden Mile' },
    { name: 'Pretoria', coordinates: [-25.7479, 28.2293], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'Jacaranda City' },
    { name: 'Port Elizabeth', coordinates: [-33.9608, 25.6022], province: 'Eastern Cape', icon: <Waves className="h-4 w-4" />, description: 'Windy City' },
    { name: 'Bloemfontein', coordinates: [-29.0852, 26.1596], province: 'Free State', icon: <Home className="h-4 w-4" />, description: 'City of Roses' },
    { name: 'East London', coordinates: [-33.0153, 27.9116], province: 'Eastern Cape', icon: <Waves className="h-4 w-4" />, description: 'Buffalo City' },
    { name: 'Pietermaritzburg', coordinates: [-29.6197, 30.3925], province: 'KwaZulu-Natal', icon: <Trees className="h-4 w-4" />, description: 'City of Choice' },
    { name: 'Kimberley', coordinates: [-28.7282, 24.7499], province: 'Northern Cape', icon: <Mountain className="h-4 w-4" />, description: 'Diamond City' },
    { name: 'Polokwane', coordinates: [-23.9045, 29.4689], province: 'Limpopo', icon: <Trees className="h-4 w-4" />, description: 'Capital of Limpopo' },
    { name: 'Nelspruit', coordinates: [-25.4753, 30.9694], province: 'Mpumalanga', icon: <Trees className="h-4 w-4" />, description: 'Gateway to Kruger' },
    { name: 'Rustenburg', coordinates: [-25.6672, 27.2424], province: 'North West', icon: <Factory className="h-4 w-4" />, description: 'Platinum City' },
    { name: 'George', coordinates: [-33.9628, 22.4619], province: 'Western Cape', icon: <Mountain className="h-4 w-4" />, description: 'Garden Route' },
    { name: 'Witbank', coordinates: [-25.8738, 29.2321], province: 'Mpumalanga', icon: <Factory className="h-4 w-4" />, description: 'Coal Capital' },
    { name: 'Vanderbijlpark', coordinates: [-26.7118, 27.8376], province: 'Gauteng', icon: <Factory className="h-4 w-4" />, description: 'Steel City' },
    
    // Gauteng Areas
    { name: 'Centurion', coordinates: [-25.8601, 28.1878], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'Tech Hub' },
    { name: 'Roodepoort', coordinates: [-26.1625, 27.8710], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'West Rand' },
    { name: 'Boksburg', coordinates: [-26.2121, 28.2621], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'East Rand' },
    { name: 'Benoni', coordinates: [-26.1885, 28.3207], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'Lakeside City' },
    { name: 'Kempton Park', coordinates: [-26.1015, 28.2305], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'Airport City' },
    { name: 'Alberton', coordinates: [-26.2674, 28.1211], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'South of Joburg' },
    { name: 'Germiston', coordinates: [-26.2309, 28.1775], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'Gold Reef City' },
    { name: 'Springs', coordinates: [-26.2500, 28.4000], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'Mining Town' },
    { name: 'Randburg', coordinates: [-26.0939, 28.0021], province: 'Gauteng', icon: <Building className="h-4 w-4" />, description: 'Business Hub' },
    { name: 'Soweto', coordinates: [-26.2678, 27.8585], province: 'Gauteng', icon: <Home className="h-4 w-4" />, description: 'South Western Townships' },
    { name: 'Chiawelo', coordinates: [-26.2833, 27.8667], province: 'Gauteng', icon: <Home className="h-4 w-4" />, description: 'Soweto Township' },
    { name: 'Mapetla', coordinates: [-26.2667, 27.8500], province: 'Gauteng', icon: <Home className="h-4 w-4" />, description: 'Soweto Area' },
    { name: 'Protea Glen', coordinates: [-26.3167, 27.8833], province: 'Gauteng', icon: <Home className="h-4 w-4" />, description: 'Southern Soweto' },
    
    // Limpopo Areas
    { name: 'Thohoyandou', coordinates: [-22.9467, 30.4849], province: 'Limpopo', icon: <Mountain className="h-4 w-4" />, description: 'Venda Capital' },
    { name: 'Thulamela', coordinates: [-22.9000, 30.5000], province: 'Limpopo', icon: <Mountain className="h-4 w-4" />, description: 'Venda Municipality' },
    { name: 'Thononda', coordinates: [-22.8833, 30.4500], province: 'Limpopo', icon: <Trees className="h-4 w-4" />, description: 'Venda Village' },
    { name: 'Nzhelele', coordinates: [-22.8833, 30.4167], province: 'Limpopo', icon: <Trees className="h-4 w-4" />, description: 'Cultural Heritage' },
    { name: 'Tzaneen', coordinates: [-23.8328, 30.1628], province: 'Limpopo', icon: <Trees className="h-4 w-4" />, description: 'Fruit Capital' },
    { name: 'Giyani', coordinates: [-23.3026, 30.7188], province: 'Limpopo', icon: <Trees className="h-4 w-4" />, description: 'Tsonga Land' },
    { name: 'Musina', coordinates: [-22.3547, 30.0436], province: 'Limpopo', icon: <Mountain className="h-4 w-4" />, description: 'Border Town' },
    { name: 'Mokopane', coordinates: [-24.1946, 29.0094], province: 'Limpopo', icon: <Factory className="h-4 w-4" />, description: 'Mining Center' },
    { name: 'Bela-Bela', coordinates: [-24.8833, 28.2833], province: 'Limpopo', icon: <Thermometer className="h-4 w-4" />, description: 'Hot Springs' },
    { name: 'Modimolle', coordinates: [-24.7000, 28.4167], province: 'Limpopo', icon: <Mountain className="h-4 w-4" />, description: 'Nylstroom' },
    { name: 'Thabazimbi', coordinates: [-24.4000, 27.4167], province: 'Limpopo', icon: <Factory className="h-4 w-4" />, description: 'Iron Mountain' },
    { name: 'Lephalale', coordinates: [-23.6833, 27.7500], province: 'Limpopo', icon: <Factory className="h-4 w-4" />, description: 'Coal Power' },
    { name: 'Makhado', coordinates: [-23.0500, 29.9167], province: 'Limpopo', icon: <Mountain className="h-4 w-4" />, description: 'Louis Trichardt' },
    { name: 'Malamulele', coordinates: [-23.0333, 30.7500], province: 'Limpopo', icon: <Trees className="h-4 w-4" />, description: 'Tsonga Town' },
    { name: 'Shayandima', coordinates: [-22.9833, 30.4333], province: 'Limpopo', icon: <Trees className="h-4 w-4" />, description: 'University Town' },
    { name: 'Sibasa', coordinates: [-22.9500, 30.4833], province: 'Limpopo', icon: <Building className="h-4 w-4" />, description: 'Administrative Center' }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getWeatherIcon = (iconCode: string, description: string) => {
    const descLower = description.toLowerCase();
    
    // Use OpenWeatherMap icon codes for more accurate icons
    if (iconCode.startsWith('01')) { // clear sky
      return <Sun className="h-8 w-8 text-yellow-500 animate-bounce-gentle" />;
    } else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) { // clouds
      return <Cloud className="h-8 w-8 text-gray-500 animate-float-slow" />;
    } else if (iconCode.startsWith('09') || iconCode.startsWith('10')) { // rain
      return <CloudRain className="h-8 w-8 text-blue-500 animate-bounce-gentle" />;
    } else if (iconCode.startsWith('13')) { // snow
      return <CloudSnow className="h-8 w-8 text-blue-300 animate-float-slow" />;
    } else if (iconCode.startsWith('11')) { // thunderstorm
      return <Zap className="h-8 w-8 text-purple-500 animate-pulse" />;
    } else if (iconCode.startsWith('50')) { // mist/fog
      return <Wind className="h-8 w-8 text-gray-600 animate-pulse" />;
    } else {
      return <Sun className="h-8 w-8 text-yellow-500 animate-bounce-gentle" />;
    }
  };

  const getWeatherColors = (iconCode: string, description: string) => {
    if (iconCode.startsWith('01')) { // clear sky
      return 'from-yellow-400 to-orange-500';
    } else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) { // clouds
      return 'from-gray-400 to-gray-600';
    } else if (iconCode.startsWith('09') || iconCode.startsWith('10')) { // rain
      return 'from-blue-400 to-blue-600';
    } else if (iconCode.startsWith('13')) { // snow
      return 'from-blue-300 to-blue-500';
    } else if (iconCode.startsWith('11')) { // thunderstorm
      return 'from-purple-500 to-indigo-600';
    } else if (iconCode.startsWith('50')) { // mist/fog
      return 'from-gray-500 to-slate-600';
    } else {
      return 'from-yellow-400 to-orange-500';
    }
  };

  const getFoodRecommendation = (iconCode: string, description: string, temp: number, location: string) => {
    const descLower = description.toLowerCase();
    const locationLower = location.toLowerCase();
    
    // Limpopo/Venda specific recommendations
    if (locationLower.includes('thohoyandou') || locationLower.includes('nzhelele') || locationLower.includes('thulamela') || 
        locationLower.includes('thononda') || locationLower.includes('shayandima') || locationLower.includes('sibasa')) {
      
      // Traditional Venda food recommendations based on weather and location
      if (temp > 30) {
        const hotWeatherFoods = [
          'Perfect weather for cold magwanda (traditional sour milk) and pap! 🥛🌽',
          'Hot day - try refreshing nguluvhe (traditional drink) with mielie meal! 🥤',
          'Great weather for cold magulu (traditional porridge) and morogo! 🥣🥬',
          'Perfect for nama ya thoho (traditional meat) with cold drinks! 🥩🧊'
        ];
        return hotWeatherFoods[Math.floor(Math.random() * hotWeatherFoods.length)];
      } else if (temp > 25) {
        const warmWeatherFoods = [
          'Warm weather - perfect for tshikonelo (traditional stew) and pap! 🍲🌽',
          'Great day for mukumbani (traditional vegetables) with samp! 🥬🫘',
          'Perfect for Mutuku (traditional porridge) and morogo! 🥣🥬',
          'Ideal weather for traditional pap with magwanda! 🌭🥛'
        ];
        return warmWeatherFoods[Math.floor(Math.random() * warmWeatherFoods.length)];
      } else {
        const coolWeatherFoods = [
          'Cool weather - perfect for warm magwanda porridge and traditional tea! ☕🥣',
          'Great day for hot soup and fresh bread! 🍲🍞',
          'Ideal for warm magulu stew with traditional vegetables! 🍲🥬',
          'Perfect for hot nama ya thoho with steamed pap! 🥩🌽'
        ];
        return coolWeatherFoods[Math.floor(Math.random() * coolWeatherFoods.length)];
      }
    }
    
    if (locationLower.includes('malamulele')) {
      if (temp > 25) {
        const tsongaFoods = [
          'Warm Tsonga weather - perfect for traditional xirhove (sour porridge)! 🥣',
          'Great day for magwanda-style Tsonga cuisine with cold drinks! 🥤',
          'Perfect for nguluvhe (traditional Tsonga drink) and grilled meat! 🥛🥩'
        ];
        return tsongaFoods[Math.floor(Math.random() * tsongaFoods.length)];
      }
      return 'Cool weather - ideal for warm tihove and traditional Tsonga stew! 🍲';
    }
    
    if (locationLower.includes('soweto') || locationLower.includes('chiawelo') || locationLower.includes('mapetla') || locationLower.includes('protea glen')) {
      if (temp > 25) return 'Hot day in the township - perfect for cold drinks and kota! 🥤🥪';
      return 'Great weather for traditional township food - try some vetkoek! 🍞';
    }
    
    if (locationLower.includes('polokwane')) {
      if (temp > 25) return 'Warm Polokwane weather - perfect for boerewors and cold beer! 🌭🍺';
      return 'Cool Polokwane day - ideal for warm potjiekos! 🍲';
    }
    
    if (temp > 30) {
      return 'Very hot! Perfect for ice cream and cold drinks! 🍦❄️';
    } else if (temp > 25) {
      return 'Warm weather - great for refreshing smoothies! 🥤';
    } else if (iconCode.startsWith('09') || iconCode.startsWith('10') || iconCode.startsWith('11')) {
      return 'Rainy weather - hot soup and warm meals recommended! ☕🍲';
    } else if (temp < 10) {
      return 'Cold weather - perfect for hot coffee and hearty meals! ☕🍲';
    } else if (temp < 15) {
      return 'Cool weather - warm comfort food perfect! 🍲';
    } else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) {
      return 'Cloudy day - great weather for comfort food! 🍲';
    } else {
      return 'Perfect weather for any delicious meal! 🌟';
    }
  };
  
  const requestLocationPermission = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeather(undefined, latitude, longitude);
        },
        error => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };
  

  const fetchWeather = async (locationName?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);
  
    try {
      let finalLat: number;
      let finalLon: number;
      let targetLocation: string;
  
      if (lat !== undefined && lon !== undefined) {
        finalLat = lat;
        finalLon = lon;
        targetLocation = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`; // fallback label
      } else {
        targetLocation = locationName || weather.location;
        const location = locations.find(loc => loc.name === targetLocation);
  
        if (!location) {
          throw new Error('Location not found');
        }
  
        [finalLat, finalLon] = location.coordinates;
      }
  
      const url = `${BASE_URL}?lat=${finalLat}&lon=${finalLon}&appid=${API_KEY}&units=metric`;
      console.log('Fetching weather from:', url.replace(API_KEY, '[API_KEY_HIDDEN]'));
  
      const response = await fetch(url);
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (response.status === 404) {
          throw new Error('Location not found in weather service.');
        } else {
          throw new Error(`Weather service error: ${response.status}`);
        }
      }
  
      const data = await response.json();
      console.log('Weather data received:', data);
  
      const newWeather: WeatherData = {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main.toLowerCase(),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind?.speed * 3.6) || 0,
        visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
        pressure: data.main.pressure,
        location: locationName || data.name || targetLocation,
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon,
        sunrise: data.sys?.sunrise,
        sunset: data.sys?.sunset,
        recommendation: getFoodRecommendation(
          data.weather[0].icon,
          data.weather[0].description,
          Math.round(data.main.temp),
          targetLocation
        )
      };
  
      setWeather(newWeather);
      setLastUpdated(new Date());
      setShowLocationSelector(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
  
      const fallbackWeather: WeatherData = {
        temperature: 22,
        condition: 'clear',
        humidity: 60,
        windSpeed: 10,
        visibility: 10,
        pressure: 1013,
        location: locationName || weather.location,
        description: 'clear sky (offline)',
        feelsLike: 24,
        icon: '01d',
        recommendation: 'Weather data unavailable - perfect for ordering food! 🍽️'
      };
  
      setWeather(fallbackWeather);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLocationChange = (location: Location) => {
    fetchWeather(location.name);
    setSearchQuery('');
  };

  const getDeliveryStatus = () => {
    if (error) {
      return { status: 'Unknown', message: 'Weather data unavailable', color: 'text-gray-600' };
    }
    
    if (weather.windSpeed > 30) {
      return { status: 'Delayed', message: 'High winds may cause slight delays', color: 'text-orange-600' };
    } else if (weather.condition.includes('rain') || weather.condition.includes('storm')) {
      return { status: 'Careful', message: 'Rainy weather - extra care taken', color: 'text-blue-600' };
    } else if (weather.temperature > 35) {
      return { status: 'Hot Weather', message: 'Very hot - drivers taking extra breaks', color: 'text-red-600' };
    } else if (weather.temperature < 5) {
      return { status: 'Cold Weather', message: 'Cold conditions - may affect delivery time', color: 'text-blue-600' };
    } else {
      return { status: 'Optimal', message: 'Perfect conditions for fast delivery!', color: 'text-green-600' };
    }
  };

  // Fetch weather on component mount and every 10 minutes
  useEffect(() => {
    // Check if we should ask for location permission
    const hasAskedPermission = localStorage.getItem('weatherLocationPermissionAsked');
    const permissionDenied = localStorage.getItem('weatherLocationPermissionDenied');
    
    if (!hasAskedPermission && !permissionDenied && navigator.geolocation) {
      // Show location permission request after a short delay
      setTimeout(() => {
        setShowLocationPermission(true);
      }, 2000);
    } else {
      // Use default location or last selected location
      fetchWeather();
    }
    
    const interval = setInterval(() => fetchWeather(), 600000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  const deliveryStatus = getDeliveryStatus();

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div 
        className={`bg-white rounded-3xl shadow-2xl border border-gray-200 transition-all duration-500 transform hover:scale-105 cursor-pointer ${
          isExpanded ? 'w-80' : 'w-64'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Main Weather Display */}
        <div className={`bg-gradient-to-r ${getWeatherColors(weather.icon, weather.description)} p-6 rounded-t-3xl text-white relative overflow-hidden`}>
          {loading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-sm font-medium">Updating...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute top-2 right-2">
              <AlertCircle className="h-5 w-5 text-red-300 animate-pulse" />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                {getWeatherIcon(weather.icon, weather.description)}
                <div>
                  <div className="text-3xl font-bold">{weather.temperature}°C</div>
                  <div className="text-sm opacity-90 capitalize">{weather.description}</div>
                </div>
              </div>
              
              {/* Location with Change Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLocationSelector(!showLocationSelector);
                }}
                className="text-sm opacity-75 flex items-center hover:opacity-100 transition-opacity duration-300 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm"
              >
                <MapPin className="h-4 w-4 mr-1" />
                <span>{weather.location}</span>
                <ChevronDown className={`h-3 w-3 ml-1 transition-transform duration-300 ${showLocationSelector ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className="text-right">
              <div className="text-xs opacity-75 mb-1">
                {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-400' : 'bg-green-400'} ${error ? 'animate-pulse' : 'animate-pulse'}`}></div>
              <div className="text-xs opacity-60 mt-1">
                {error ? 'Offline' : 'Live'}
              </div>
            </div>
          </div>
        </div>

        {/* Location Selector */}
        {showLocationSelector && (
          <div className="bg-white border-t border-gray-200 p-4 animate-slide-down">
            {/* Use My Location Button */}
            {navigator.geolocation && !locationPermissionDenied && (
              <div className="mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    requestLocationPermission();
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  disabled={loading}
                >
                  <MapPin className={`h-5 w-5 ${loading ? 'animate-spin' : 'animate-bounce-gentle'}`} />
                  <span>{loading ? 'Getting Location...' : 'Use My Current Location'}</span>
                </button>
              </div>
            )}
            
            {userLocation && (
              <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-2 text-green-700">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">Current Location: {userLocation.name}</span>
                </div>
              </div>
            )}
            
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
              {filteredLocations.map((location) => (
                <button
                  key={location.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationChange(location);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:bg-blue-50 group ${
                    weather.location === location.name ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${weather.location === location.name ? 'bg-blue-200' : 'bg-gray-100 group-hover:bg-blue-100'}`}>
                        {location.icon}
                      </div>
                      <div>
                        <div className={`font-medium ${weather.location === location.name ? 'text-blue-700' : 'text-gray-900'}`}>
                          {location.name}
                        </div>
                        <div className="text-xs text-gray-500">{location.province} • {location.description}</div>
                      </div>
                    </div>
                    {weather.location === location.name && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </button>
              ))}
              
              {filteredLocations.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No cities found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && !showLocationSelector && (
          <div className="p-6 animate-slide-up">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Weather Service Issue</span>
                </div>
                <p className="text-xs text-red-600 mt-1">{error}</p>
                {(error.includes('API key') || error.includes('not configured')) && (
                  <div className="mt-2 text-xs text-blue-600">
                    <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                      Get your free API key here →
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Feels Like */}
            <div className="mb-4 p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Feels like</span>
                <span className="font-semibold text-blue-600">{weather.feelsLike}°C</span>
              </div>
            </div>

            {/* Weather Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500">Humidity</div>
                  <div className="font-semibold">{weather.humidity}%</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Wind</div>
                  <div className="font-semibold">{weather.windSpeed} km/h</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-xs text-gray-500">Visibility</div>
                  <div className="font-semibold">{weather.visibility} km</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Gauge className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-xs text-gray-500">Pressure</div>
                  <div className="font-semibold">{weather.pressure} mb</div>
                </div>
              </div>
            </div>

            {/* Food Recommendation */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-900">Food Recommendation</span>
              </div>
              <p className="text-sm text-gray-700">{weather.recommendation}</p>
            </div>

            {/* Delivery Status */}
            <div className={`p-3 rounded-xl border mb-4 ${
              deliveryStatus.status === 'Optimal' ? 'bg-green-50 border-green-200' :
              deliveryStatus.status === 'Delayed' ? 'bg-orange-50 border-orange-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800">Delivery Status</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    deliveryStatus.status === 'Optimal' ? 'bg-green-500' :
                    deliveryStatus.status === 'Delayed' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <span className={`text-xs font-medium ${deliveryStatus.color}`}>
                    {deliveryStatus.status}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-700 mt-1">{deliveryStatus.message}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.geolocation && !locationPermissionDenied) {
                    requestLocationPermission();
                  } else {
                    setShowLocationSelector(true);
                  }
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm font-medium flex items-center justify-center space-x-1"
              >
                <MapPin className="h-4 w-4" />
                <span>{navigator.geolocation && !locationPermissionDenied ? 'Use My Location' : 'Change Location'}</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fetchWeather();
                }}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-sm font-medium flex items-center justify-center space-x-1"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Updating...' : 'Refresh'}</span>
              </button>
            </div>

            {/* API Status */}
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-500">
                {error ? (
                  <span className="text-red-500">⚠️ Using offline data</span>
                ) : (
                  <span className="text-green-500">🌐 Live weather data</span>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {/* Expand/Collapse Indicator */}
        {!showLocationSelector && (
          <div className="px-6 pb-4">
            <div className="flex justify-center">
              <div className={`w-8 h-1 bg-gray-300 rounded-full transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}