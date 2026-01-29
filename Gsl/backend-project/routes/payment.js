const express = require('express');
const Payment = require('../models/Payment');
const ServiceRecord = require('../models/ServiceRecord');

const router = express.Router();

// GET all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET payment by PaymentNumber
router.get('/:paymentNumber', async (req, res) => {
  try {
    const payment = await Payment.findOne({ PaymentNumber: req.params.paymentNumber });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new payment
router.post('/', async (req, res) => {
  try {
    const { RecordNumber, AmountPaid, PaymentDate } = req.body;
    // Validate if service record exists
    const serviceRecord = await ServiceRecord.findOne({ RecordNumber: parseInt(RecordNumber) });
    if (!serviceRecord) return res.status(400).json({ message: 'Service record with this number does not exist' });
    const lastPayment = await Payment.findOne().sort({ PaymentNumber: -1 });
    const PaymentNumber = lastPayment ? lastPayment.PaymentNumber + 1 : 1;
    const payment = new Payment({ PaymentNumber, RecordNumber, AmountPaid: parseFloat(AmountPaid), PaymentDate: new Date(PaymentDate) });
    await payment.save();
    res.json({ message: 'Payment added', id: payment._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update payment
router.put('/:paymentNumber', async (req, res) => {
  try {
    const { RecordNumber, AmountPaid, PaymentDate } = req.body;
    await Payment.findOneAndUpdate({ PaymentNumber: req.params.paymentNumber }, { RecordNumber, AmountPaid: parseFloat(AmountPaid), PaymentDate: new Date(PaymentDate) });
    res.json({ message: 'Payment updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE payment
router.delete('/:paymentNumber', async (req, res) => {
  try {
    await Payment.findOneAndDelete({ PaymentNumber: req.params.paymentNumber });
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
