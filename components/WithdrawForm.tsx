'use client'

import React, { useState } from 'react';

const WithdrawForm = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const [recipient, setRecipient] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ amount, method, recipient, securityCode });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">Account Balance: <span className="font-bold text-gray-800">$5,000.00</span></p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
            Withdrawal Amount
          </label>
          <input
            type="number"
            id="amount"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="method">
            Select Withdrawal Method
          </label>
          <select
            id="method"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="bank">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="crypto">Cryptocurrency</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="recipient">
            Recipient Details
          </label>
          <input
            type="text"
            id="recipient"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter recipient details"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="security-code">
            Security Code
          </label>
          <input
            type="password"
            id="security-code"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your security code"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            <strong>Fees:</strong> 2% of the withdrawal amount.<br />
            <strong>Estimated Time:</strong> 1-3 business days.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Confirm Withdrawal
        </button>
      </form>
    </div>
  );
};

export default WithdrawForm;
