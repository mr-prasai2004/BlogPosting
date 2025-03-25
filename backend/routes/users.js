// routes/users.js (for example)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Your MySQL connection

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;  // Change 'name' to 'username'
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Check if user already exists
      const [existingUsers] = await db.query(
        'SELECT * FROM users WHERE email = ?', 
        [email]
      );
  
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Insert user into database
      const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
  
      // Create JWT token
      const token = jwt.sign(
        { user: { id: result.insertId, email } },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.JWT_SECRET
        );

        res.json({ token });  // Send token to frontend
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

  
module.exports = router;