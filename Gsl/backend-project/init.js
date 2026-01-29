const mongoose = require('./db'); // This will connect to MongoDB Atlas

// Since MongoDB Atlas handles database creation, just wait for connection and run setup
mongoose.connection.once('open', () => {
  console.log('MongoDB connection established');
  console.log('Seeding data...');
  require('./setup');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
