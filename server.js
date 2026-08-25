const express = require("express");
const cors = require("cors");
const path = require("path");
const salesHandler = require("./api/sales");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend from public/
app.use(express.static(path.join(__dirname, "public")));

// API endpoint for sales data
app.get("/api/sales", (req, res) => {
  salesHandler(req, res);
});

// Root health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Fallback to index.html for unknown routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 SIM Sales Dashboard running at http://localhost:${PORT}`);
});
