const express = require("express");
const { body, validationResult } = require("express-validator");
const { pool } = require("../db");

const router = express.Router();

router.get("/portfolio", async (_req, res) => {
  try {
    const queries = await Promise.all([
      pool.query("SELECT * FROM site_settings LIMIT 1"),
      pool.query("SELECT * FROM about LIMIT 1"),
      pool.query("SELECT * FROM projects ORDER BY `order`, created_at DESC"),
      pool.query("SELECT * FROM skills ORDER BY `order`, id ASC"),
      pool.query("SELECT * FROM professional_skills ORDER BY `order`, id ASC"),
      pool.query("SELECT * FROM tools ORDER BY `order`, id ASC"),
      pool.query("SELECT * FROM experience ORDER BY `order`, start_date DESC"),
      pool.query("SELECT * FROM education ORDER BY `order`, start_date DESC"),
      pool.query("SELECT * FROM certifications ORDER BY `order`, start_date DESC"),
      pool.query("SELECT * FROM blog_posts ORDER BY created_at DESC"),
      pool.query("SELECT * FROM categories ORDER BY created_at DESC"),
      pool.query("SELECT * FROM testimonials ORDER BY created_at DESC"),
      pool.query("SELECT * FROM github_stats LIMIT 1"),
    ]);

    const [settings] = queries[0];
    const [about] = queries[1];

    return res.json({
      siteSettings: settings[0] || null,
      about: about[0] || null,
      projects: queries[2][0],
      skills: queries[3][0],
      professionalSkills: queries[4][0],
      tools: queries[5][0],
      experience: queries[6][0],
      education: queries[7][0],
      certifications: queries[8][0],
      blogPosts: queries[9][0],
      categories: queries[10][0],
      testimonials: queries[11][0],
      githubStats: queries[12][0] || null,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load portfolio", error: err.message });
  }
});

router.post(
  "/contact",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("message").notEmpty().withMessage("Message is required"),
    body("phone").optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, subject, message } = req.body;
      const [result] = await pool.query(
        "INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?,?,?,?,?)",
        [name, email, phone || null, subject, message]
      );

      return res.status(201).json({ id: result.insertId });
    } catch (err) {
      return res.status(500).json({ message: "Failed to submit message", error: err.message });
    }
  }
);

router.post(
  "/newsletter",
  [body("email").isEmail().withMessage("Valid email is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;
      await pool.query(
        "INSERT INTO newsletter (email, subscribed) VALUES (?, 1) ON DUPLICATE KEY UPDATE subscribed = VALUES(subscribed)",
        [email]
      );
      return res.status(201).json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: "Failed to subscribe", error: err.message });
    }
  }
);

module.exports = router;
