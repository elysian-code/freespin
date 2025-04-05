import React, { useState } from 'react';

const VerificationForm = () => {
  const [txid, setTxid] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [cryptoType, setCryptoType] = useState('');
  const [date, setDate] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit the form data for verification
    console.log({ txid, walletAddress, amount, cryptoType, date, screenshot });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-lg font-medium text-gray-700">Transaction ID (TXID)</label>
        <input 
          type="text"
          value={txid}
          onChange={(e) => setTxid(e.target.value)}
          required
          className="mt-2 p-3 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
        />
      </div>

     
     
      

      <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit for Verification
      </button>
    </form>
  );
};

export default VerificationForm;
