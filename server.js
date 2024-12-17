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


app.use(cors({
  origin: ['https://annadaata.netlify.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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