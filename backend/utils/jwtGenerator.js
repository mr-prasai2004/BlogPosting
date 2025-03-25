const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(userId) {
  const payload = {
    user: {
      id: userId
    }
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = jwtGenerator;