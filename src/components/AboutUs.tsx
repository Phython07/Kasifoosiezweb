import React from 'react';
import { Heart, Users, MapPin, Award } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community First",
      description: "We believe in supporting local businesses and bringing communities together through great food."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Focused",
      description: "Every decision we make is centered around providing the best experience for our customers."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Local Impact",
      description: "We're proud to serve local communities and help small businesses thrive in the digital age."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assured",
      description: "We partner only with restaurants that meet our high standards for food quality and service."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
            About KasiFoodies
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Connecting communities through delicious food and supporting local businesses across South Africa.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                KasiFoodies was born from a simple idea: everyone deserves access to delicious, authentic local food, 
                delivered fresh to their door. We started as a small team passionate about connecting food lovers with 
                the incredible flavors found in local communities across South Africa.
              </p>
              <p className="mb-6">
                What began as a way to support local restaurants during challenging times has grown into a platform 
                that celebrates the rich culinary diversity of our communities. We're not just a delivery service – 
                we're a bridge between talented local chefs and food enthusiasts who appreciate authentic, quality meals.
              </p>
              <p>
                Today, KasiFoodies proudly serves thousands of customers while supporting hundreds of local businesses, 
                creating jobs, and fostering economic growth in communities across the country.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-yellow-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              To make delicious, authentic local food accessible to everyone while empowering local businesses 
              to thrive in the digital economy. We're building more than a delivery platform – we're building 
              stronger communities, one meal at a time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}