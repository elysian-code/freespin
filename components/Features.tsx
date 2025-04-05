import React from 'react';

const Feature = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12">Why Choose Our Crypto Investment Platform?</h2>
        <div className="flex flex-wrap justify-center">
          
          {/* Feature 1: High Security */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">High Security</h3>
              <p>Advanced encryption and multi-factor authentication to safeguard your investments against threats.</p>
            </div>
          </div>
          
          {/* Feature 2: Decentralized Assets */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-blue-600 text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2">Decentralized Assets</h3>
              <p>Diversify your portfolio with investments in top-performing decentralized assets.</p>
            </div>
          </div>

          {/* Feature 3: High Liquidity */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-blue-600 text-4xl mb-4">💧</div>
              <h3 className="text-xl font-bold mb-2">High Liquidity</h3>
              <p>Enjoy easy access to your funds with minimal transaction times and high liquidity options.</p>
            </div>
          </div>

          {/* Feature 4: 24/7 Support */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-blue-600 text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p>Our dedicated support team is available around the clock to assist you with any questions or issues.</p>
            </div>
          </div>

          {/* Feature 5: Transparent Fees */}
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-blue-600 text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2">Transparent Fees</h3>
              <p>We offer a clear and competitive fee structure with no hidden charges, so you always know what to expect.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
