const express = require("express");
const { body, validationResult } = require("express-validator");
const { pool } = require("../db");

function createCrudRouter(config) {
  const {
    table,
    allowedFields,
    primaryKey = "id",
    orderBy,
    readonly = false,
  } = config;

  const router = express.Router();

  const validators = allowedFields.map((field) =>
    body(field).optional({ nullable: true })
  );

  router.get("/", async (_req, res) => {
    try {
      const orderClause = orderBy ? ` ORDER BY ${orderBy}` : "";
      const [rows] = await pool.query(`SELECT * FROM ${table}${orderClause}`);
      return res.json(rows);
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch records", error: err.message });
    }
  });

  router.get(`/:id`, async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM ${table} WHERE ${primaryKey} = ? LIMIT 1`,
        [req.params.id]
      );
      if (!rows.length) {
        return res.status(404).json({ message: "Record not found" });
      }
      return res.json(rows[0]);
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch record", error: err.message });
    }
  });

  if (!readonly) {
    router.post("/", validators, async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const payload = filterFields(req.body, allowedFields);
        if (!Object.keys(payload).length) {
          return res.status(400).json({ message: "No valid fields supplied" });
        }
        const columns = Object.keys(payload);
        const placeholders = columns.map(() => "?").join(",");
        const values = Object.values(payload);

        const [result] = await pool.query(
          `INSERT INTO ${table} (${columns.join(",")}) VALUES (${placeholders})`,
          values
        );
        const [rows] = await pool.query(
          `SELECT * FROM ${table} WHERE ${primaryKey} = ? LIMIT 1`,
          [result.insertId]
        );
        return res.status(201).json(rows[0]);
      } catch (err) {
        return res.status(500).json({ message: "Failed to create record", error: err.message });
      }
    });

    router.put(`/:id`, validators, async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const payload = filterFields(req.body, allowedFields);
        if (!Object.keys(payload).length) {
          return res.status(400).json({ message: "No valid fields supplied" });
        }

        const assignments = Object.keys(payload)
          .map((field) => `${field} = ?`)
          .join(",");
        const values = [...Object.values(payload), req.params.id];

        const [result] = await pool.query(
          `UPDATE ${table} SET ${assignments} WHERE ${primaryKey} = ?`,
          values
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Record not found" });
        }

        const [rows] = await pool.query(
          `SELECT * FROM ${table} WHERE ${primaryKey} = ? LIMIT 1`,
          [req.params.id]
        );
        return res.json(rows[0]);
      } catch (err) {
        return res.status(500).json({ message: "Failed to update record", error: err.message });
      }
    });

    router.delete(`/:id`, async (req, res) => {
      try {
        const [result] = await pool.query(
          `DELETE FROM ${table} WHERE ${primaryKey} = ?`,
          [req.params.id]
        );
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Record not found" });
        }
        return res.json({ success: true });
      } catch (err) {
        return res.status(500).json({ message: "Failed to delete record", error: err.message });
      }
    });
  }

  return router;
}

function filterFields(source, allowed) {
  return Object.entries(source || {}).reduce((acc, [key, value]) => {
    if (allowed.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

module.exports = { createCrudRouter };
