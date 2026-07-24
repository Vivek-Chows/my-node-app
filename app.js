const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// Health check endpoint for ECS
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});
// Home endpoint
app.get("/", (req, res) => {
  res.json({
    message: "CI/CD Pipeline is currently in process",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});
// API endpoint
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
});
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  res.status(201).json({
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString(),
  });
});
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`Version: ${process.env.APP_VERSION || "1.0.0"}`);
  });
}
module.exports = app;
