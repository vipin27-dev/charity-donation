const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const donationController = require("../controller/donationController");
const userController = require("../controller/userController");
const charityController = require("../controller/charityController");
const adminController = require("../controller/adminController");
const authenticateToken = require("../middleWare/auth");

router.post("/login", (req, res) => {
  authController.login(req, res);
});

router.post("/signup", (req, res) => {
  authController.signup(req, res);
});

// Protected Routes (require authentication)
router.get("/profile", authenticateToken, (req, res) => {
  userController.getProfile(req, res);
});

router.post("/profile/update", authenticateToken, (req, res) => {
  userController.updateProfile(req, res);
});

router.get("/charities", (req, res) => {
  charityController.getAllCharities(req, res);
});

router.get("/charity/:id", (req, res) => {
  charityController.getCharityDetails(req, res);
});

router.post("/charity/register", authenticateToken, (req, res) => {
  charityController.registerCharity(req, res);
});

// Admin Routes
router.get("/admin", authenticateToken, (req, res) => {
  adminController.getAdminDashboard(req, res);
});

router.get("/admin/users", authenticateToken, (req, res) => {
  adminController.getAllUsers(req, res);
});

router.get("/admin/charities", authenticateToken, (req, res) => {
  adminController.getPendingCharities(req, res);
});
// Route to approve a charity
router.post("/admin/charity/approve", authenticateToken, (req, res) => {
  adminController.approveCharity(req, res);
});
router.delete("/admin/charities/:id", authenticateToken, (req, res) => {
  adminController.declineCharity(req, res);
});

router.get("/charities/approved", authenticateToken, (req, res) => {
  adminController.getApprovedCharities(req, res);
});
// Donation Routes
router.get("/donate", authenticateToken, (req, res) => {
  donationController.getDonation(req, res);
});

router.post("/donate", authenticateToken, (req, res) => {
  donationController.processDonation(req, res);
});

router.get("/donations/history", authenticateToken, (req, res) => {
  donationController.getDonationHistory(req, res);
});

router.get("/user/profile", authenticateToken, (req, res) => {
  userController.getProfile(req, res);
});
router.put("/user/profile", authenticateToken, (req, res) => {
  userController.updateProfile(req, res);
});

module.exports = router;
