'use client'

import React from 'react';

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'Deposit Successful',
      description: 'Your deposit of 0.5 BTC has been successfully credited to your account.',
      timestamp: '2024-08-25 14:23:00',
      type: 'success',
    },
    {
      id: 2,
      title: 'Withdrawal Request Approved',
      description: 'Your withdrawal request for 1.2 ETH has been approved and is being processed.',
      timestamp: '2024-08-24 10:15:00',
      type: 'info',
    },
    {
      id: 3,
      title: 'Password Changed',
      description: 'Your account password was successfully changed.',
      timestamp: '2024-08-22 08:45:00',
      type: 'warning',
    },
    {
      id: 4,
      title: 'Unusual Login Attempt',
      description: 'An unusual login attempt was detected. If this wasn’t you, please secure your account.',
      timestamp: '2024-08-21 17:30:00',
      type: 'alert',
    },
  ];

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div id="main" className="main-content flex-1 bg-slate-50 mt-12 md:mt-2 pb-20 md:pb-5">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-blue-900 text-white p-6 shadow-md">
        <div className="container flex justify-between ">
          <h1 className="text-3xl pl-3 font-bold">Notifications</h1>
          <nav>
            
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-16 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-4xl mt-4 font-semibold mb-8 text-gray-800">Your Notifications</h2>
          
          <div className="space-y-6">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-md ${getNotificationStyle(notification.type)}`}
              >
                <h3 className="text-2xl font-semibold mb-2">{notification.title}</h3>
                <p className="text-lg">{notification.description}</p>
                <p className="text-sm text-gray-600 mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
              </div>
            ))}
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

export default NotificationPage;
