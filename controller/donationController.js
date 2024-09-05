const Razorpay = require('razorpay');
const Donation = require('../models/Donation');
const Charity = require('../models/Charity');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new donation and generate a Razorpay order
exports.processDonation = async (req, res) => {
  try {
    const { charityId, amount } = req.body;

    // Add logic for processing the donation, like saving to the database
    const donation = await Donation.create({ charityId, amount, userId: req.userId });

    // Create Razorpay order (for example)
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${donation.id}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(201).json({
      success: true,
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ error: "Failed to process donation" });
  }
};

exports.getDonationHistory = async (req, res) => {
  try {
    const donations = await Donation.findAll({ where: { userId: req.userId } });

    res.json(donations);
  } catch (error) {
    console.error("Get donation history error:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
