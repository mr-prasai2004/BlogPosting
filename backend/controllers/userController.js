const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.user.id;

    // Get the current user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    const updateData = {
      username: username || user.username,
      email: email || user.email
    };

    // Update user in database
    const updatedUser = await User.update(userId, updateData);

    // If password is provided, update it separately
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      await pool.execute(
        'UPDATE users SET password = ? WHERE user_id = ?',
        [hashedPassword, userId]
      );
    }

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get the current user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user from database
    await User.delete(userId);

    res.json({
      success: true,
      message: 'User account deleted successfully'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
  }

  res.json({ message: "Login successful" });
};