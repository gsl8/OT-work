const mongoose = require('mongoose');

const serviceRecordSchema = new mongoose.Schema({
  RecordNumber: { type: Number, unique: true },
  PlateNumber: { type: String, required: true }, // Reference to Car.PlateNumber
  ServiceCode: { type: Number, required: true },
  ServiceDate: { type: Date, required: true }
});

module.exports = mongoose.model('ServiceRecord', serviceRecordSchema);
