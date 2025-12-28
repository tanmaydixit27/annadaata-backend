const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const grainsRoutes = require('./routes/grainsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const eventRoutes = require('./routes/eventRoutes');
const passport = require('./middleware/googleAuthMiddleware');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// CORS – This is all you need (keep this)
app.use(cors({
  origin: [
    'http://localhost:3000',          // Local dev
    'https://annadaata.netlify.app'   // Deployed
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(passport.initialize());

// DELETE OR COMMENT OUT THIS ENTIRE BLOCK – IT'S OVERRIDING CORS!
/*
app.options('*', cors());  // Also remove this if present

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://annadaata.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});
*/

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grains', grainsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/ai', aiRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome to the Anndaata API');
});

require('dotenv').config();
console.log(process.env.GOOGLE_CLIENT_ID);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
