import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Phone, Mail, Clock, Smile, Paperclip, Mic, Camera, ThumbsUp, Star } from 'lucide-react';

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'rating';
}

export default function LiveChat({ isOpen, onClose }: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 Welcome to KasiFoodies! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Track my order',
    'Restaurant hours',
    'Delivery areas',
    'Payment issues',
    'Become a partner',
    'App support'
  ];

  const botResponses: { [key: string]: string } = {
    'track my order': 'I can help you track your order! Please provide your order number (e.g., #KF2024) and I\'ll get the latest status for you.',
    'restaurant hours': 'Most of our partner restaurants are open from 9:00 AM to 11:00 PM. However, hours may vary by location. Which restaurant are you interested in?',
    'delivery areas': 'We currently deliver to Johannesburg, Cape Town, Durban, and Pretoria. We\'re expanding to more cities soon! What\'s your area?',
    'payment issues': 'I\'m sorry to hear about payment issues. Our payment system supports cards, EFT, and mobile payments. What specific issue are you experiencing?',
    'become a partner': 'Great! We\'d love to have your restaurant join our platform. You can register at our partner portal or I can connect you with our business team.',
    'app support': 'I\'m here to help with any app-related questions! Are you having trouble with login, ordering, or something else?',
    'default': 'Thank you for your message! Our support team will get back to you shortly. Is there anything else I can help you with?'
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responseKey = text.toLowerCase();
      const response = botResponses[responseKey] || botResponses['default'];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage('Voice message: How do I track my order?');
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4 animate-fade-in-up">
      <div className="w-full max-w-md h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce-gentle">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">KasiFoodies Support</h3>
                <p className="text-blue-100 text-sm flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Online • Avg response: 30s
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full text-sm transition-all duration-300">
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </button>
            <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full text-sm transition-all duration-300">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div className={`flex items-end space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                }`}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md border'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="flex items-end space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 bg-white border-t">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-xs rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Smile className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Paperclip className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Voice Recording */}
            <button
              onClick={toggleRecording}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mic className="h-5 w-5" />
            </button>

            {/* Camera */}
            <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
              <Camera className="h-5 w-5 text-gray-600" />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="mt-2 flex items-center justify-center space-x-2 text-red-500 animate-fade-in-up">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Recording... Tap to stop</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Rating Prompt */}
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-800">Rate your experience:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}