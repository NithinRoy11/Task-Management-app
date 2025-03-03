const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;