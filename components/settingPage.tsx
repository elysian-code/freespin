'use client'


import React, { useState } from 'react';

const SettingsPage = () => {
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [apiKey, setApiKey] = useState('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

  const handlePasswordChange = () => {
    // Logic to change the password
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Logic to enable/disable 2FA
  };

  const handleNotificationsChange = (type: string) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type],
    });
    // Logic to update notification preferences
  };

  const handleApiKeyReset = () => {
    // Logic to reset API key
    setApiKey('new-api-key');
  };

  return (
    <div id="main" className="main-content flex-1 bg-slate-50 mt-12 md:mt-2 pb-20 md:pb-5">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
          <nav>
            
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-16 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Account Settings</h2>

          {/* Email */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            />
            <button
              onClick={handlePasswordChange}
              className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Change Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Two-Factor Authentication</h3>
            <div className="flex items-center">
              <label className="text-lg font-medium text-gray-700 mr-4">Enable 2FA</label>
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={handleTwoFactorToggle}
                className="form-checkbox h-6 w-6 text-blue-600"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="text-lg font-medium text-gray-700 mr-4">Email Notifications</label>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationsChange('email')}
                  className="form-checkbox h-6 w-6 text-blue-600"
                />
              </div>
              <div className="flex items-center">
                <label className="text-lg font-medium text-gray-700 mr-4">SMS Notifications</label>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() => handleNotificationsChange('sms')}
                  className="form-checkbox h-6 w-6 text-blue-600"
                />
              </div>
              <div className="flex items-center">
                <label className="text-lg font-medium text-gray-700 mr-4">Push Notifications</label>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleNotificationsChange('push')}
                  className="form-checkbox h-6 w-6 text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* API Key Management */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">API Key Management</h3>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-lg font-medium text-gray-700">API Key</label>
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="mt-2 p-3 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleApiKeyReset}
                className="ml-4 bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reset API Key
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Crypto Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SettingsPage;
