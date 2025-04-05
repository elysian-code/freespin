'use client'


import React, { useState, useEffect } from 'react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { FaCoins, FaCopy, FaDollarSign } from 'react-icons/fa';
import CardPaymentForm from './cardPaymentForm';

// const DepositPage = () => {
//   const [depositMethod, setDepositMethod] = useState('crypto');
//   const [selectedCrypto, setSelectedCrypto] = useState('BTC');
//   const [cryptoAmount, setCryptoAmount] = useState('');
//   const [fiatAmount, setFiatAmount] = useState('');
//   const [conversionRate, setConversionRate] = useState(30000); // Mock conversion rate for BTC to USD
//   const [cryptoOptions] = useState([
//     { name: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
//     { name: 'ETH', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
//     { name: 'LTC', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
//     { name: 'USDT', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
//     { name: 'BNB', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
//     { name: 'CAKE', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
//     { name: 'DOGE', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
//     { name: 'TRX', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
//   ]);
//   const [walletAddress, setWalletAddress] = useState('');

//   useEffect(() => {
//     // Update wallet address and conversion rate based on selected crypto
//     const selectedToken = cryptoOptions.find((crypto) => crypto.name === selectedCrypto);
//     setWalletAddress(selectedToken?.address as string);

//     if (selectedCrypto === 'BTC') {
//       setConversionRate(30000);
//     } else if (selectedCrypto === 'ETH') {
//       setConversionRate(2000);
//     } else if (selectedCrypto === 'LTC') {
//       setConversionRate(100);
//     }
//   }, [selectedCrypto]);

//   const handleCryptoAmountChange = (amount: number) => {
//     setCryptoAmount(amount as any);
//     setFiatAmount((amount * conversionRate).toFixed(2));
//   };

//   const handleCopyAddress = () => {
//     navigator.clipboard.writeText(walletAddress);
//     alert('Wallet address copied to clipboard');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
      
      
//       {/* Main Content */}
//       <main className="container mx-auto py-16 px-4">
        
//         {/* Deposit Instructions */}
//         <section className="mb-12">
//           <h2 className="text-4xl font-semibold mb-6 text-gray-800">Make a Deposit</h2>
//           <p className="text-lg text-gray-600">Select your deposit method, choose a cryptocurrency, and enter the amount you'd like to deposit.</p>
//         </section>
        
//         {/* Deposit Form */}
//         <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
//           <h3 className="text-3xl font-semibold mb-8 text-gray-800">Deposit Details</h3>
          
//           <div className="mb-8">
//             <label className="block text-lg font-medium mb-4">Deposit Method</label>
//             <div className="flex space-x-6">
//               <button 
//                 className={`p-4 rounded-lg transition-colors ${depositMethod === 'fiat' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white' : 'bg-gray-200 text-gray-700'}`}
//                 onClick={() => setDepositMethod('fiat')}
//               >
//                 <i className="fas fa-dollar-sign mr-2"></i> Fiat
//               </button>
//               <button 
//                 className={`p-4 rounded-lg transition-colors ${depositMethod === 'crypto' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white' : 'bg-gray-200 text-gray-700'}`}
//                 onClick={() => setDepositMethod('crypto')}
//               >
//                 <i className="fas fa-coins mr-2"></i> Crypto
//               </button>
//             </div>
//           </div>

//           {/* Conditional rendering based on selected deposit method */}
//           {depositMethod === 'crypto' && (
//             <>
//               <div className="mb-6">
//                 <label className="block text-lg font-medium mb-4">Select Cryptocurrency</label>
//                 <select 
//                   value={selectedCrypto} 
//                   onChange={(e) => setSelectedCrypto(e.target.value)}
//                   className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {cryptoOptions.map((crypto) => (
//                     <option key={crypto.name} value={crypto.name}>{crypto.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-lg font-medium mb-4">Wallet Address</label>
//                 <div className="relative">
//                   <input 
//                     type="text" 
//                     value={walletAddress}
//                     readOnly
//                     className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button 
//                     onClick={handleCopyAddress} 
//                     className="absolute top-0 right-0 mt-3 mr-3 text-blue-600 hover:text-blue-800 focus:outline-none"
//                   >
//                     <FaCopy />
//                   </button>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-lg font-medium mb-4">Crypto Amount</label>
//                 <input 
//                   type="number" 
//                   value={cryptoAmount}
//                   onChange={(e) => handleCryptoAmountChange(e.target.value as any)}
//                   placeholder={`Enter amount in ${selectedCrypto}`} 
//                   className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="mb-8">
//                 <label className="block text-lg font-medium mb-4">Fiat Equivalent (USD)</label>
//                 <input 
//                   type="text" 
//                   value={fiatAmount}
//                   readOnly
//                   className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </>
//           )}

//           {/* Deposit Summary */}
//           <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-inner">
//             <h4 className="text-xl font-semibold mb-4 text-gray-800">Deposit Summary</h4>
//             <p className="text-gray-700"><strong>Method:</strong> {depositMethod === 'crypto' ? 'Cryptocurrency' : 'Fiat'}</p>
//             {depositMethod === 'crypto' && (
//               <>
//                 <p className="text-gray-700"><strong>Selected Crypto:</strong> {selectedCrypto}</p>
//                 <p className="text-gray-700"><strong>Crypto Amount:</strong> {cryptoAmount} {selectedCrypto}</p>
//                 <p className="text-gray-700"><strong>Fiat Equivalent:</strong> ${fiatAmount} USD</p>
//                 <p className="text-gray-700"><strong>Conversion Rate:</strong> 1 {selectedCrypto} = ${conversionRate} USD</p>
//               </>
//             )}
//           </section>

//           <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">Confirm Deposit</button>
//         </section>
        
//         {/* Security Notice */}
//         <section className="bg-yellow-100 border-l-4 border-yellow-500 p-6 mb-12">
//           <h3 className="text-xl font-semibold mb-2 text-gray-800">Security Notice</h3>
//           <p className="text-gray-700">For your protection, all deposits are secured with advanced encryption and two-factor authentication (2FA). Ensure that your wallet address is correct before proceeding with the deposit.</p>
//         </section>

//         {/* Transaction History */}
       
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 Your Crypto Project. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default DepositPage;


// import React, { useState } from 'react';


const DepositPage = () => {
  const [method, setMethod] = useState('Crypto');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [cryptoType, setCryptoType] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [showCryptoCard, setShowCryptoCard] = useState(false);
  const [cryptoOptions] = useState([
        { name: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
        { name: 'ETH', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
        { name: 'LTC', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
        { name: 'USDT', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
        { name: 'BNB', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
        { name: 'CAKE', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
        { name: 'DOGE', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
        { name: 'TRX', address: 'LcWoFH8rF5ZL9kH3NQUAeHfXwLCShvFkjR' },
      ]);
      

  // Example crypto options with addresses
  // const cryptoOptions = {
  //   Bitcoin: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
  //   Ethereum: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88',
  //   USDT: 'TVpy3LMEeRJjcqsTGk6kGxs5y7yvc4TZ9n'
  // };

  // useEffect(() => {
  //       // Update wallet address and conversion rate based on selected crypto
  //       const selectedToken = cryptoOptions.find((crypto) => crypto.name === cryptoType);
  //       setCryptoAddress(selectedToken?.address as string);
    
  //     }, [cryptoType]);

 
 const ChangeAddress = (name: string) => {
  const selectedToken = cryptoOptions.find((crypto) => crypto.name === name);
  setCryptoAddress(selectedToken?.address as string);
 }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cryptoAddress);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-white rounded-lg  shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Deposit Funds</h1>
      
      {/* Method Selection */}
      <div className="mb-4">
        
          <div className="mb-8">         <label className="block text-lg font-medium mb-4">Deposit Method</label>
            <div className="flex space-x-6">
              <button 
                className={`p-4 rounded-lg transition-colors ${method === 'Card' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setMethod('Card')}
              >
                <FaDollarSign /> Card
              </button>
              <button 
                className={`p-4 rounded-lg transition-colors ${method === 'Crypto' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setMethod('Crypto')}
              >
                <FaCoins /> Crypto
              </button>
            </div>
          </div>
        
       
      </div>

      {/* Crypto Amount Input */}
      {method === 'Card' && (<CardPaymentForm />)}
      {method === 'Crypto' && (
        <>

        {!showCryptoCard && (
          <>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Enter Amount</label>
              <input 
                type="number" 
                value={cryptoAmount} 
                onChange={(e) => setCryptoAmount(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Enter amount"
              />
            </div>

            {/* Crypto Type Selection */}
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Select Crypto</label>
              <select 
                value={cryptoType} 
                onChange={(e) => {
                  setCryptoType(e.target.value)
                  ChangeAddress(e.target.value)
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              >
                {cryptoOptions.map((crypto) => (
                    <option key={crypto.name}  value={crypto.name}>{crypto.name}</option>
                  ))}
              </select>
            </div>

            {/* Continue Button */}
            {cryptoType && (
              <button 
                onClick={() => setShowCryptoCard(true)} 
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition focus:ring focus:ring-blue-200 mb-4"
              >
                Continue
              </button>
            )}
          </>
        )}
          

          {/* Crypto Details Card */}
          {showCryptoCard && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold mb-2">Crypto Deposit Details</h2>

              {/* Display Crypto Name */}
              <p className="mb-2"><strong>Crypto:</strong> {cryptoType}</p>

              {/* Display and Copy Crypto Address */}
              <div className="mb-4">
                <label className="block text-md font-semibold mb-1">Send {cryptoAmount} to this Address</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3">
                  <span className="flex-grow">{cryptoAddress}</span>
                  <button 
                    onClick={copyToClipboard} 
                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Transaction ID Input */}
              <div className="mb-4">
                <label className="block text-md font-semibold mb-1">Transaction ID</label>
                <input 
                  type="text" 
                  value={transactionId} 
                  onChange={(e) => setTransactionId(e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Enter transaction ID"
                />
              </div>

              {/* Verify Button */}
              <button 
                onClick={() => alert(`Verifying transaction ID: ${transactionId}`)}
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition focus:ring focus:ring-green-200"
              >
                Verify
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DepositPage;

