const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader); // Log the Authorization header
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (token == null) {
    console.log("No token provided"); // Debugging line
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.sendStatus(403); // Forbidden
    }

    try {
      const foundUser = await User.findByPk(decoded.userId);
      if (!foundUser) {
        console.log("User not found"); // Debugging line
        return res.sendStatus(403); // Forbidden
      }

      req.userId = decoded.userId;
      next();
    } catch (dbError) {
      console.error("Database error:", dbError.message);
      return res.sendStatus(500); // Internal Server Error
    }
  });
};


module.exports = authenticateToken;
