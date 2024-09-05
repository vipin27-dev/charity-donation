const User = require("../models/User");
const Charity = require("../models/Charity");

// Get Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const usersCount = await User.count();
    const charitiesCount = await Charity.count({
      where: { isApproved: false },
    });
    const charities = await Charity.findAll(); 

    res.render("admin/dashboard", {
      usersCount,
      charitiesCount,
      charities,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Charities
exports.getAllCharities = async (req, res) => {
  try {
    const charities = await Charity.findAll({ where: { isApproved: true } });
    res.json({ charities });
  } catch (error) {
    console.error("Get all charities error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPendingCharities = async (req, res) => {
  try {
    console.log("Fetching pending charities...");
    const charities = await Charity.findAll({ where: { isApproved: false } });
    res.json({ charities });
  } catch (error) {
    console.error("Get pending charities error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.approveCharity = async (req, res) => {
  const { charityId } = req.body;

  try {
    const charity = await Charity.findByPk(charityId);

    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    charity.isApproved = true;
    await charity.save();

    res.json({ message: "Charity approved successfully" });
  } catch (error) {
    console.error("Approve charity error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.declineCharity = async (req, res) => {
  try {
    const { id } = req.params;
    const charity = await Charity.findByPk(id);

    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    await charity.destroy();
    res.status(200).json({ message: "Charity declined successfully" });
  } catch (error) {
    console.error("Error declining charity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getApprovedCharities = async (req, res) => {
  try {
    const charities = await Charity.findAll({
      where: {
        isApproved: true,
      },
    });
    res.json(charities);
  } catch (error) {
    console.error("Error fetching approved charities:", error);
    res.status(500).json({ message: "Failed to fetch approved charities." });
  }
};
