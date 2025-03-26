const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const { loginUser } = require('./controllers/userController');
const userRoutes = require("./routes/users"); 
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/users', require('./routes/users'));
router.post('/api/login', loginUser);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


