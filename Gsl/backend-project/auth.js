const express = require('express');
const User = require('./models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const lastUser = await User.findOne().sort({ id: -1 });
    const id = lastUser ? lastUser.id + 1 : 1;
    const user = new User({ id, username, password });
    await user.save();
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password: password ? 'provided' : 'missing' });
    const user = await User.findOne({ username });
    console.log('User found:', user ? 'yes' : 'no');
    if (!user || user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
    req.session.userId = user.id;
    res.json({ message: 'Logged in' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

module.exports = router;
