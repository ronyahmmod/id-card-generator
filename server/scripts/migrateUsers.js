const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const Student = require("../models/Student");
const Employee = require("../models/Employee");
const User = require("../models/User");

const DEFAULT_PASSWORD = "12345678";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

const migrate = async () => {
  try {
    await connectDB();
    await User.deleteMany({}); // Be careful — deletes all users

    // Migrate Students
    const students = await Student.find();
    let studentCount = 0;
    for (const student of students) {
      const email = `s-${student.studentId}@yourdomain.com`.toLowerCase();
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        await User.create({
          name: student.fullName,
          email,
          password: DEFAULT_PASSWORD,
          role: "student",
          student: student._id,
        });
        studentCount++;
        console.log(`Created user for student: ${student.fullName}`);
      }
    }

    // 🔁 Migrate Employees
    const employees = await Employee.find();
    let employeeCount = 0;

    for (const employee of employees) {
      const email = employee.email.toLowerCase();

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        await User.create({
          name: employee.name,
          email,
          password: DEFAULT_PASSWORD,
          role: employee.role.toLowerCase() || "teacher",
          employee: employee._id,
        });
        employeeCount++;
        console.log(`✅ Created user for employee: ${employee.name}`);
      }
    }
    console.log(
      `\n✅ Migration complete: ${studentCount} students, ${employeeCount} employees`
    );
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

migrate();
