const User = require('../models/User');

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['name', 'email', 'phno'] // Include 'phno' to fetch phone number
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const { name, email, phno } = req.body;

  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure that the email, if provided, is not already in use by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(409).json({ message: 'Email already in use' }); // Conflict status code
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phno = phno || user.phno;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
