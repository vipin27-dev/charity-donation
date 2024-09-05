const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Donation = sequelize.define(
  "Donation",
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "completed", "failed"]],
      },
    },
    receiptUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Donation;
