// pages/api/buyCrypto.js

import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }

  const { cardDetails, amount, cryptoType, walletAddress } = req.body;

  try {
    // 1. Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe amount is in cents, adjust accordingly
      currency: 'usd',
      payment_method_types: ['card'],
      description: `Buying ${cryptoType} with a card`,
    });

    // 2. Confirm the payment using the client-side card details
    const paymentConfirmation = await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method_data: {
        type: 'card',
        card: {
          number: cardDetails.number,
          exp_month: cardDetails.exp_month,
          exp_year: cardDetails.exp_year,
          cvc: cardDetails.cvc,
        },
      },
    });

    if (paymentConfirmation.status !== 'succeeded') {
      throw new Error('Payment was not successful.');
    }

    // 3. Use the crypto API to purchase and send the crypto to the wallet address
    const cryptoPurchaseResponse = await axios.post(
      `${process.env.CRYPTO_API_BASE_URL}/purchaseCrypto`,
      {
        amount,
        cryptoType,
        walletAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CRYPTO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (cryptoPurchaseResponse.data.status !== 'success') {
      throw new Error('Crypto purchase failed.');
    }

    // 4. Return a success response to the client
    return res.status(200).json({
      message: `Successfully purchased ${amount} worth of ${cryptoType}.`,
      transactionId: cryptoPurchaseResponse.data.transactionId,
      walletAddress,
    });

  } catch (error: any) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: error.message });
  }
}
