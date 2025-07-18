require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();
require("./config/passport");

const studentRoutes = require("./routes/students");
const collegeRoutes = require("./routes/colleges");
const idCardRoutes = require("./routes/idCards");
const employeeRoutes = require("./routes/employees");

// Auth routes
const authRoutes = require("./routes/auth");

const { connectDB } = require("./config/db");
connectDB();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// ROUTERS
app.use("/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/colleges", collegeRoutes);
app.use("/api/v1/id-cards", idCardRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
