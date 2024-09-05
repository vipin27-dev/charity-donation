const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Charity = sequelize.define('Charity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mission: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  goals: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

module.exports = Charity;
