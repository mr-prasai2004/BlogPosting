const pool = require('../config/db');

// Blog model with database queries
const Blog = {
  async create(title, content, userId) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)',
        [title, content, userId]
      );
      
      const [rows] = await pool.execute(
        'SELECT * FROM blogs WHERE blog_id = ?',
        [result.insertId]
      );
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getAll(limit = 10, offset = 0) {
    try {
      const [rows] = await pool.execute(
        `SELECT b.*, u.username 
         FROM blogs b 
         JOIN users u ON b.user_id = u.user_id 
         ORDER BY b.created_at DESC 
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const [rows] = await pool.execute(
        `SELECT b.*, u.username 
         FROM blogs b 
         JOIN users u ON b.user_id = u.user_id 
         WHERE b.blog_id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async update(id, userId, data) {
    const { title, content } = data;
    try {
      await pool.execute(
        'UPDATE blogs SET title = ?, content = ? WHERE blog_id = ? AND user_id = ?',
        [title, content, id, userId]
      );
      
      const [rows] = await pool.execute(
        'SELECT * FROM blogs WHERE blog_id = ?',
        [id]
      );
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id, userId) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM blogs WHERE blog_id = ? AND user_id = ?',
        [id, userId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Blog;
