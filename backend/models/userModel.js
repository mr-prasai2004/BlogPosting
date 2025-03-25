const pool = require('../config/db');

// User model with database queries
const User = {
  // Create a new user
  async create(username, email, hashedPassword) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
      
      const [user] = await pool.execute(
        'SELECT * FROM users WHERE user_id = ?',
        [result.insertId]
      );
      
      return user[0];
    } catch (error) {
      throw error;
    }
  },

  // Find user by email
  async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Find user by ID
  async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT user_id, username, email, created_at FROM users WHERE user_id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update user
  async update(id, data) {
    const { username, email } = data;
    try {
      await pool.execute(
        'UPDATE users SET username = ?, email = ? WHERE user_id = ?',
        [username, email, id]
      );
      
      const [rows] = await pool.execute(
        'SELECT user_id, username, email, created_at FROM users WHERE user_id = ?',
        [id]
      );
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  async delete(id) {
    try {
      await pool.execute('DELETE FROM users WHERE user_id = ?', [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }
};


module.exports = User;