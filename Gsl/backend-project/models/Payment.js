const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  PaymentNumber: { type: Number, required: true, unique: true },
  RecordNumber: { type: Number, required: true },
  AmountPaid: { type: Number, required: true },
  PaymentDate: { type: Date, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
