// auth-server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Path to our “database”
const dbPath = path.join(__dirname, "users.json");

// Load existing users or start with empty array
let users = [];
if (fs.existsSync(dbPath)) {
  users = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
} else {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

// Helper to save users array back to disk
function saveUsers() {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

// Registration endpoint
app.post("/api/register", async (req, res) => {
  const { role, email, password, wallet } = req.body;
  // Basic validation
  if (!role || !email || !password || !wallet) {
    return res.status(400).json({ message: "Missing fields" });
  }
  // Prevent duplicate emails
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: "User already exists" });
  }
  // Hash the password
  const hash = await bcrypt.hash(password, 10);
  users.push({ role, email, password: hash, wallet });
  saveUsers();
  res.status(201).json({ message: "Registration successful" });
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { role, email, password } = req.body;
  const user = users.find(u => u.role === role && u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Return the registered wallet address to the frontend
  return res
    .status(200)
    .json({ message: "Login successful", wallet: user.wallet });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});
