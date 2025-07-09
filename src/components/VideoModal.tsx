import React from 'react';
import { X, Play, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const demoFeatures = [
    { time: 0, title: "Welcome to KasiFoodies", description: "Your premium food delivery experience" },
    { time: 5, title: "Browse Restaurants", description: "500+ local restaurants at your fingertips" },
    { time: 10, title: "Easy Ordering", description: "Simple, intuitive ordering process" },
    { time: 15, title: "Real-time Tracking", description: "Track your order from kitchen to door" },
    { time: 20, title: "Fast Delivery", description: "Average delivery time: 25 minutes" },
    { time: 25, title: "Happy Customers", description: "Join 50,000+ satisfied customers" }
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const getCurrentFeature = () => {
    return demoFeatures.find((feature, index) => {
      const nextFeature = demoFeatures[index + 1];
      return currentTime >= feature.time && (!nextFeature || currentTime < nextFeature.time);
    }) || demoFeatures[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="relative w-full max-w-6xl bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-400 to-orange-400">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center animate-bounce-gentle">
              <Play className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">KasiFoodies Demo</h2>
              <p className="text-black/70">Experience the future of food delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
          >
            <X className="h-6 w-6 text-black group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 p-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Simulated Video Content */}
              <div className="aspect-video bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float-reverse-slow"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse-slow"></div>
                </div>

                {/* Demo Content */}
                <div className="relative z-10 text-center text-white">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 animate-text-shimmer">
                      {getCurrentFeature().title}
                    </h3>
                    <p className="text-xl opacity-90 animate-fade-in-up">
                      {getCurrentFeature().description}
                    </p>
                  </div>

                  {/* Simulated App Interface */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto animate-slide-up">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/20 rounded-lg p-3 animate-pulse">
                        <div className="w-full h-16 bg-white/30 rounded-lg mb-2"></div>
                        <div className="h-3 bg-white/40 rounded mb-1"></div>
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 animate-pulse delay-200">
                        <div className="w-full h-16 bg-white/30 rounded-lg mb-2"></div>
                        <div className="h-3 bg-white/40 rounded mb-1"></div>
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold animate-glow-pulse">
                      Order Now - 25 min delivery
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-1000 ease-linear"
                    style={{ width: `${(currentTime / 30) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePlayPause}
                    className="w-10 h-10 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    {isPlaying ? (
                      <div className="w-3 h-3 bg-black rounded-sm"></div>
                    ) : (
                      <Play className="h-5 w-5 text-black ml-0.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleMuteToggle}
                    className="w-8 h-8 text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  
                  <button
                    onClick={handleRestart}
                    className="w-8 h-8 text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm">
                    {Math.floor(currentTime)}s / 30s
                  </span>
                  <button className="w-8 h-8 text-white hover:text-yellow-400 transition-colors duration-300">
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Features Timeline */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
              Demo Timeline
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {demoFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    currentTime >= feature.time && (index === demoFeatures.length - 1 || currentTime < demoFeatures[index + 1].time)
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-lg animate-glow-pulse'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setCurrentTime(feature.time)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <span className="text-sm opacity-70">{feature.time}s</span>
                  </div>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* App Download CTAs */}
            <div className="space-y-3 pt-4 border-t border-white/20">
              <h4 className="text-white font-semibold mb-3">Ready to get started?</h4>
              
              <a
                href="https://play.google.com/store/apps/details?id=za.co.cyber.systems&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-3 rounded-xl font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 text-center animate-glow-pulse"
              >
                Download Customer App
              </a>
              
              <a
                href="https://play.google.com/store/apps/details?id=za.co.cyber.food.ordering.service&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Register Restaurant
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-play simulation */}
      <div className="hidden">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          autoPlay
          muted={isMuted}
        >
          <source src="data:video/mp4;base64," type="video/mp4" />
        </video>
      </div>

      {/* Auto-advance timer */}
      {React.useEffect(() => {
        if (isOpen) {
          setIsPlaying(true);
          const timer = setInterval(() => {
            setCurrentTime(prev => {
              if (prev >= 30) {
                setIsPlaying(false);
                return 0;
              }
              return prev + 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        }
      }, [isOpen])}
    </div>
  );
}