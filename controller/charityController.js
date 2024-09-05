const Charity = require("../models/Charity");

exports.registerCharity = async (req, res) => {
  const { name, mission, goals } = req.body;

  if (!name || !mission) {
    return res.status(400).json({ message: "Name and mission are required" });
  }

  try {
    const charity = await Charity.create({
      name,
      mission,
      goals,
      adminId: req.userId,
    });

    res.status(201).json(charity);
  } catch (error) {
    console.error("Register charity error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCharityProfile = async (req, res) => {
  const { charityId } = req.params;

  try {
    const charity = await Charity.findByPk(charityId);

    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    res.json(charity);
  } catch (error) {
    console.error("Get charity profile error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCharityProfile = async (req, res) => {
  const { charityId } = req.params;
  const { name, mission, goals } = req.body;

  if (!name && !mission && !goals) {
    return res
      .status(400)
      .json({ message: "At least one field must be updated" });
  }

  try {
    const charity = await Charity.findByPk(charityId);

    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    if (charity.adminId !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    charity.name = name || charity.name;
    charity.mission = mission || charity.mission;
    charity.goals = goals || charity.goals;

    await charity.save();

    res.json({ message: "Charity profile updated successfully" });
  } catch (error) {
    console.error("Update charity profile error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
