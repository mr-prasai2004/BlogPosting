const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure req.user contains the userId as 'id'
    req.user = { id: decoded.userId }; // Match the decoded token's structure

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
