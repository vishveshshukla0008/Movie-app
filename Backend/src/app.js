const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const errorHandler = require("./middlewares/ErrorHandler");
const { authRouter } = require("./routes/auth.routes");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// API
app.use("/api/auth", authRouter);

// static frontend
app.use(express.static(path.join(__dirname, "../public")));

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(errorHandler);

module.exports = app;