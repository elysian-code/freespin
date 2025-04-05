import React, { useState } from 'react';

const CardPaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
//   const [billingAddress, setBillingAddress] = useState('');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add logic to process the card payment
    alert('Processing card payment...');
  };

  return (
    <div className="container mx-auto pt-0 p-6 max-w-md bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Card Payment</h1>
      <form onSubmit={handlePaymentSubmit}>
        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            required
          />
        </div>

        {/* Expiry Date and CVV */}
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-lg font-semibold mb-2">Expiry Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-lg font-semibold mb-2">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Cardholder Name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Full Name"
            required
          />
        </div>

        {/* Billing Address */}
        {/* <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Billing Address</label>
          <textarea
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Street Address, City, State, Zip Code"
            rows={3}
            required
          />
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition focus:ring focus:ring-blue-200"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CardPaymentForm;
