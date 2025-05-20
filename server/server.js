require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const studentRoutes = require("./routes/students");
const collegeRoutes = require("./routes/colleges");
const idCardRoutes = require("./routes/idCards");

const { connectDB } = require("./config/db");
connectDB();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// ROUTERS
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/colleges", collegeRoutes);
app.use("/api/v1/id-cards", idCardRoutes),
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
