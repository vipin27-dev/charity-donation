const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Donation = sequelize.define('Donation', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true, // Ensures that the amount is a decimal number
      min: 0.01,       // Ensures that the minimum donation amount is greater than zero
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'completed', 'failed']], // Ensures that the status is one of the allowed values
    },
  },
  receiptUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true, // Ensures that the receipt URL, if provided, is a valid URL
    },
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = Donation;
