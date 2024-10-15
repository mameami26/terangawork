const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Function to process payment
const processPayment = async (amount, token) => {
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100, // Stripe handles amounts in cents
      currency: 'usd',
      description: 'Payment for service on TérangaWork',
      source: token, // The Stripe token obtained from the frontend
    });

    return charge;
  } catch (error) {
    console.error('Payment error:', error);
    throw new Error('Payment failed');
  }
};

module.exports = { processPayment };
