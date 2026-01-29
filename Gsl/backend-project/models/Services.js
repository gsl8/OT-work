const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  ServiceCode: { type: Number, unique: true },
  ServiceName: { type: String, required: true },
  ServicePrice: { type: Number, required: true }
});

module.exports = mongoose.model('Services', servicesSchema);
