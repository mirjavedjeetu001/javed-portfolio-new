const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const adminPassword = process.env.ADMIN_PASSWORD || "change-me";
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || null;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const emailMatches = email === adminEmail;
  let passwordMatches = false;

  if (adminPasswordHash) {
    passwordMatches = await bcrypt.compare(password, adminPasswordHash);
  } else {
    passwordMatches = password === adminPassword;
  }

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "change-me", {
    expiresIn: "12h",
  });

  return res.json({ token });
});

module.exports = router;
