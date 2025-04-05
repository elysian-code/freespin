import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Header */}
      
      {/* Main Content */}
      <main className="container mx-auto py-16 px-4">
        
        {/* Profile Overview */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">Profile Overview</h2>
          
          <div className="flex items-center space-x-6 mb-8">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-md"
            />
            <div>
              <h3 className="text-3xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-lg text-gray-600">johndoe@example.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">Personal Information</h4>
              <ul className="text-lg text-gray-600">
                <li className="mb-2"><strong>Full Name:</strong> John Doe</li>
                <li className="mb-2"><strong>Email:</strong> johndoe@example.com</li>
                <li className="mb-2"><strong>Phone:</strong> +1 234 567 890</li>
                <li className="mb-2"><strong>Address:</strong> 123 Main Street, Anytown, USA</li>
              </ul>
            </div>
            
            {/* Account Details */}
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">Account Details</h4>
              <ul className="text-lg text-gray-600">
                <li className="mb-2"><strong>Account ID:</strong> 9876543210</li>
                <li className="mb-2"><strong>Member Since:</strong> January 1, 2020</li>
                <li className="mb-2"><strong>Last Login:</strong> August 25, 2024</li>
                <li className="mb-2"><strong>Status:</strong> Verified</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Security Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">Password</h4>
              <p className="text-lg text-gray-600 mb-6">Ensure your account is secure by using a strong password.</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Change Password</button>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">Two-Factor Authentication (2FA)</h4>
              <p className="text-lg text-gray-600 mb-6">Add an extra layer of security to your account with 2FA.</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Enable 2FA</button>
            </div>
          </div>
        </section>

        {/* Transaction History */}
        <section>
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Transaction History</h3>
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-gray-800">Date</th>
                <th className="py-3 px-6 text-left text-gray-800">Amount</th>
                <th className="py-3 px-6 text-left text-gray-800">Type</th>
                <th className="py-3 px-6 text-left text-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-6 text-gray-700">2024-08-26</td>
                <td className="py-3 px-6 text-gray-700">0.5 BTC</td>
                <td className="py-3 px-6 text-gray-700">Deposit</td>
                <td className="py-3 px-6 text-green-600">Completed</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-6 text-gray-700">2024-08-25</td>
                <td className="py-3 px-6 text-gray-700">$1,000</td>
                <td className="py-3 px-6 text-gray-700">Withdrawal</td>
                <td className="py-3 px-6 text-green-600">Completed</td>
              </tr>
              {/* More rows can be added here */}
            </tbody>
          </table>
        </section>
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

export default ProfilePage;
