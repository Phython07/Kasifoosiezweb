import React from 'react';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: "When you register to use our Platforms, we may collect Personal Information including: Name and surname, Email address, Physical address, Gender, Mobile phone number, Online identifiers, Date of birth, and Identification number."
    },
    {
      title: "How We Use Your Information",
      content: "We process your Personal Information to identify and verify you, create user accounts, fulfill contractual obligations for food delivery, provide customer support, and communicate about our services."
    },
    {
      title: "Information Sharing",
      content: "We do not sell your personal information to third parties. We may share information with our employees, service providers, outlets for delivery facilitation, and law enforcement when required by law."
    },
    {
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect your Personal Information from unauthorized access, loss, or destruction through physical, technical, and network security controls."
    },
    {
      title: "Your Rights",
      content: "You have the right to view, correct, amend, or request deletion of your Personal Information. You can also opt out of direct marketing communications and submit complaints to the Information Regulator."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-yellow-400 rounded-full">
              <Shield className="h-12 w-12 text-black" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to the Kasi Foodies Privacy Policy. We respect your privacy and take the protection of Personal Information very seriously.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <FileText className="h-8 w-8 text-yellow-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This Privacy Policy applies to all users of our Website, related mobile sites and software applications, collectively referred to as "our Platforms", which are used to access and purchase our products and services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The purpose of this Privacy Policy is to set out how, why and when Kasi F&T (Pty) Ltd t/a Kasi Foodies uses your Personal Information to comply with the Protection of Personal Information Act 4 of 2013 (POPI).
                </p>
              </div>
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  {section.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Age Restriction */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-2xl p-8 mt-8">
            <div className="flex items-start space-x-4">
              <Eye className="h-8 w-8 text-yellow-600 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Age Restrictions</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are below the age of 18 years, you must always get permission from your parent or guardian before you use our Platforms or give us your Personal Information.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Restaurants and liquor stores may not sell liquor or tobacco products to you if you are under the age of 18 regardless of any supervision by a parent or guardian.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-black rounded-2xl p-8 mt-8 text-center">
            <Lock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h3>
            <p className="text-gray-300 mb-6">
              If you have any complaints about this Privacy Policy or our compliance, you can lodge a complaint with the Information Regulator.
            </p>
            <a 
              href="https://justice.gov.za/inforeg/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              Contact Information Regulator
            </a>
          </div>

          {/* Last Updated */}
          <div className="text-center mt-8 text-gray-500">
            <p>This Privacy Policy may be updated from time to time. Please check this page regularly for updates.</p>
          </div>
        </div>
      </section>
    </div>
  );
}