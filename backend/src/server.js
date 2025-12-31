require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { healthCheck } = require("./db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");

const app = express();
const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "..", "..", "build");

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["*"];

const helmetOptions = {
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  frameguard: false,
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "frame-ancestors": ["'self'", "http://localhost:3000", "http://127.0.0.1:3000"],
    },
  },
};

app.use(helmet(helmetOptions));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", async (_req, res) => {
  try {
    await healthCheck();
    return res.json({ status: "ok" });
  } catch (err) {
    return res.status(500).json({ status: "error", error: err.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);

// Serve the React build when present (useful for cPanel / single-folder deploys)
app.use(express.static(buildPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  const indexHtml = path.join(buildPath, "index.html");
  if (!fs.existsSync(indexHtml)) return next();
  return res.sendFile(indexHtml);
});

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  return res.status(500).json({ message: "Server error", error: err.message });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on port ${port}`);
});
