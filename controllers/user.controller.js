const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
async function registerUser(req, res) {
  // Logic to register a new user

  try {
    const userData = req.body;
    if (!userData.email || !userData.password) {
      return res.status(400).json({ error: "Email and password are required" });
    } else if (userData.password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    } else if (await UserModel.findOne({ email: userData.email })) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      userData.password = bcrypt.hashSync(userData.password, 12);
      const user = await UserModel.create({ ...userData });
      if (!user) {
        return res.status(400).json({ error: "User registration failed" });
      } else {
        return res
          .status(201)
          .json({ message: "User registered successfully", user: user });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Login User
async function loginUser(req, res) {
  // Logic to authenticate user
  try {
    const { email, password } = req.body;
    let data = await UserModel.findOne({ email: email });
    if (!data) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = bcrypt.compareSync(password, data.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      let token = jwt.sign(
        { id: data._id, email: data.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "Login successful", token: token });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { registerUser, loginUser };
