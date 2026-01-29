const express = require('express');
const mongoose = require('mongoose');
const ServiceRecord = require('../models/ServiceRecord');
const Car = require('../models/Car');
const Services = require('../models/Services');

const router = express.Router();

// GET all service records
router.get('/', async (req, res) => {
  try {
    const records = await ServiceRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET service record by RecordNumber
router.get('/:recordNumber', async (req, res) => {
  try {
    const record = await ServiceRecord.findOne({ RecordNumber: req.params.recordNumber });
    if (!record) return res.status(404).json({ message: 'Service record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new service record
router.post('/', async (req, res) => {
  try {
    const { RecordNumber, PlateNumber, ServiceCode, ServiceDate } = req.body;
    // Validate if car exists
    const car = await Car.findOne({ PlateNumber });
    if (!car) return res.status(400).json({ message: 'Car with this plate number does not exist' });
    // Validate if service exists
    const service = await Services.findOne({ ServiceCode: parseInt(ServiceCode) });
    if (!service) return res.status(400).json({ message: 'Service with this code does not exist' });
    let recordNumber = RecordNumber;
    if (!recordNumber) {
      const lastRecord = await ServiceRecord.findOne().sort({ RecordNumber: -1 });
      recordNumber = lastRecord ? lastRecord.RecordNumber + 1 : 1;
    }
    const record = new ServiceRecord({
      RecordNumber: recordNumber,
      PlateNumber,
      ServiceCode: parseInt(ServiceCode),
      ServiceDate: new Date(ServiceDate)
    });
    const savedRecord = await record.save();
    res.json({ message: 'Service record added', id: savedRecord.RecordNumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update service record
router.put('/:recordNumber', async (req, res) => {
  try {
    const { PlateNumber, ServiceCode, ServiceDate } = req.body;
    // Validate if car exists
    const car = await Car.findOne({ PlateNumber });
    if (!car) return res.status(400).json({ message: 'Car with this plate number does not exist' });
    // Validate if service exists
    const service = await Services.findOne({ ServiceCode: parseInt(ServiceCode) });
    if (!service) return res.status(400).json({ message: 'Service with this code does not exist' });
    const updatedRecord = await ServiceRecord.findOneAndUpdate({ RecordNumber: req.params.recordNumber }, {
      PlateNumber,
      ServiceCode: parseInt(ServiceCode),
      ServiceDate: new Date(ServiceDate)
    }, { new: true });
    if (!updatedRecord) return res.status(404).json({ message: 'Service record not found' });
    res.json({ message: 'Service record updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE service record
router.delete('/:recordNumber', async (req, res) => {
  try {
    const deletedRecord = await ServiceRecord.findOneAndDelete({ RecordNumber: req.params.recordNumber });
    if (!deletedRecord) return res.status(404).json({ message: 'Service record not found' });
    res.json({ message: 'Service record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
