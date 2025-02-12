const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email); // Debugging

    // 1. Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("❌ User not found in database.");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    console.log("✅ User found:", user.email);
    console.log("Stored hashed password:", user.password); // Debugging

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch); // Debugging

    if (!isMatch) {
      console.log("❌ Password does not match.");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    console.log("✅ Login successful for:", user.email);
    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in." });
  }
});

module.exports = router;
