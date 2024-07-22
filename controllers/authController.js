const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const secretKey = 'your_secret_key'; // Change this to a more secure key

// Register a new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).send('Username and password are required');

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login user to get JWT token
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).send('Username and password are required');

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const accessToken = jwt.sign({ username }, secretKey);
    res.json({ accessToken });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { registerUser, loginUser };