// controller/authRoute.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const AdminUser = require("../model/adminUserSchema");

// Login route
// controller/authRoute.js
// controller/authRoute.js
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Received login request for email:", email);

    const user = await AdminUser.findOne({ email });

    if (user) {
      console.log("Found user:", user);

      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log("Password Match Result:", passwordMatch);

      if (passwordMatch) {
        console.log("Login successful");
        res.json({ success: true, message: "Login successful" });
      } else {
        console.log("Incorrect password");
        res.json({ success: false, message: "Incorrect password" });
      }
    } else {
      console.log("User not found");
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Display credentials route (for demonstration purposes)
router.get("/", async (req, res) => {
  try {
    const users = await AdminUser.find();
    res.json(users);
  } catch (error) {
    console.error("Error displaying credentials:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email already exists
    const existingUser = await AdminUser.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new AdminUser({
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
