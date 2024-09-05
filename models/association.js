const User = require('./User');
const Charity = require('./Charity');
const Donation = require('./Donation');

// User can donate to multiple charities
User.hasMany(Donation, { foreignKey: 'userId' });
Donation.belongsTo(User, { foreignKey: 'userId' });

// Charity can receive multiple donations
Charity.hasMany(Donation, { foreignKey: 'charityId' });
Donation.belongsTo(Charity, { foreignKey: 'charityId' });

// User can manage multiple charities if they are an admin
User.hasMany(Charity, { foreignKey: 'adminId' });
Charity.belongsTo(User, { foreignKey: 'adminId' });

module.exports = {
  User,
  Charity,
  Donation
};
