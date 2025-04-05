import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Tagline */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-bold text-white mb-4">Your Crypto Project</h2>
          <p className="text-sm">Empowering your financial future with secure and transparent crypto investments.</p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#home" className="hover:text-gray-100 text-sm transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-gray-100 text-sm transition-colors">About Us</a></li>
            <li><a href="#plans" className="hover:text-gray-100 text-sm transition-colors">Investment Plans</a></li>
            <li><a href="#blog" className="hover:text-gray-100 text-sm transition-colors">Blog</a></li>
            <li><a href="#contact" className="hover:text-gray-100 text-sm transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm mb-2">1234 Crypto St., Blockchain City</p>
          <p className="text-sm mb-2">Phone: +1 (555) 123-4567</p>
          <p className="text-sm">Email: <a href="mailto:info@cryptoproject.com" className="text-blue-400 hover:text-blue-500 transition-colors">info@cryptoproject.com</a></p>
        </div>

        {/* Social Media & Newsletter Signup */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><i className="fab fa-twitter text-2xl"></i></a>
            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors"><i className="fab fa-linkedin text-2xl"></i></a>
          </div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <form>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-0 top-0 mt-1 mr-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-sm">&copy; 2024 Your Crypto Project. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
