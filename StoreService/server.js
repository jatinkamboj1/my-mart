require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const apiRoutes = require("./routes");
const webhookRoutes = require("./webhooks");
const prisma = require("./prismaClient");


const app = express();
const PORT = process.env.PORT || 8080;

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

// Logging
app.use(morgan("dev"));

// CORS
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
app.use(cors());

// Webhooks (raw body)
app.use("/webhooks", express.raw({ type: "application/json" }), webhookRoutes);

// Body parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", apiRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
