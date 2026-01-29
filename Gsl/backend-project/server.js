const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./db');
const authRoutes = require('./auth');
const carRoutes = require('./routes/car');
const servicesRoutes = require('./routes/services');
const serviceRecordRoutes = require('./routes/servicerecord');
const paymentRoutes = require('./routes/payment');
const billRoutes = require('./routes/bill');
const reportsRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 5000;

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/cars', requireAuth, carRoutes);
app.use('/services', requireAuth, servicesRoutes);
app.use('/servicerecords', requireAuth, serviceRecordRoutes);
app.use('/payments', requireAuth, paymentRoutes);
app.use('/bills', requireAuth, billRoutes);
app.use('/reports', requireAuth, reportsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
