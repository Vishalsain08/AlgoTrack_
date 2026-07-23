
const express = require("express");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();


const port = process.env.PORT;

const connectToDatabase = require("./db");

const userRoutes = require("./routes/userRoutes");
const contestRoutes = require("./routes/contestRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const reminderRoutes = require("./routes/reminderRoutes");


const {processReminders} = require("./services/reminderService");

app.set("trust proxy", 1); // Trust first proxy for rate limiting

/**
 * Rate limiter configuration
 * Prevents abuse by limiting the number of requests from a single IP
 */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 500, // Maximum 500 requests per window
  message: "Too many requests, please try again later.",
});

// Initialize database connection
connectToDatabase();

// Middleware setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://algo-track-kappa.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.use(cors()); // allow everybody to use backend

app.use(express.json()); // Parse JSON request bodies
app.use(limiter); // Apply rate limiting to all routes

// Initialize reminder processing
processReminders();

/**
 * Route configurations
 * All routes are prefixed with /api
 */
app.use("/api/users", userRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.send("AlgoTrack Backend is Running 🚀");
});

/**
 * Start the server
 * Listen on the specified port from environment variables
 */
app.listen(port, () => {
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://algotrack-xqf8.onrender.com"
    : `http://localhost:${port}`;

console.log(`Server is running at ${baseUrl}`);
});
