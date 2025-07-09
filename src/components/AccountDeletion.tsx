import React from 'react';
import { UserX, AlertTriangle, Clock, Shield } from 'lucide-react';

export default function AccountDeletion() {
  const steps = [
    "Log into KasiFoodies",
    "Go to Settings > Account Removal",
    "Fill in required information",
    "Tap Remove account",
    "Enter your password to verify your identity",
    "Choose a reason for deleting account",
    "Click Continue > Delete account to confirm"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full">
              <UserX className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Account Removal Instructions
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            We're sorry to see you go. Follow these steps to remove your Kasi Foodies account.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              How to Remove Your Account
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-8 mb-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-8 w-8 text-amber-600 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notice</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center">
                    <Clock className="h-5 w-5 text-amber-600 mr-2" />
                    The account deletion process can take up to <strong>90 days</strong> to complete.
                  </p>
                  <p className="flex items-start">
                    <Shield className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                    Copies of your content may remain in backup storage after that time for security and legal compliance purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Before You Go...
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-xl">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Temporary Deactivation</h4>
                <p className="text-blue-700 mb-4">
                  Consider temporarily deactivating your account instead of permanent deletion. You can reactivate it anytime.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="p-6 bg-green-50 rounded-xl">
                <h4 className="text-lg font-semibold text-green-900 mb-3">Contact Support</h4>
                <p className="text-green-700 mb-4">
                  Having issues? Our support team is here to help resolve any problems you're experiencing.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Final Warning */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mt-8 text-center">
            <UserX className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-900 mb-4">This Action Cannot Be Undone</h3>
            <p className="text-red-700 mb-6 max-w-2xl mx-auto">
              Once you delete your account, all your data, order history, preferences, and saved information will be permanently removed. Please make sure this is what you want to do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Keep My Account
              </button>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Proceed with Deletion
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}