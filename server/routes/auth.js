const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../controller/authController");

// POST /auth/register
router.post("/register", authController.register);

// POST /auth/login
router.post("/login", authController.login);

// Future: OAuth routes (e.g., Google/Facebook)

// @route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // Option 1: Send token as JSON
    res.json({
      message: "✅ Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Option 2 (alternative): Send as cookie
    // res.cookie('token', token, { httpOnly: true }).redirect('/dashboard');
  }
);

router.get("/success", (req, res) => {
  return res.status(200).json({ message: "Google login successful!" });
});

router.get("/failure", (req, res) => {
  return res.status(200).json({ message: "Google login failed!" });
});

module.exports = router;
