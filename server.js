const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const grainsRoutes = require('./routes/grainsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ['https://annadaata.netlify.app'], // Allow requests from your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // Allow cookies and authorization headers
}));

// Handle preflight requests explicitly
app.options('*', cors());

// Global middleware for CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://annadaata.netlify.app'); // Allow requests from your frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grains', grainsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome to the Anndaata API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});