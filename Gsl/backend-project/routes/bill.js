const express = require('express');
const ServiceRecord = require('../models/ServiceRecord');
const Car = require('../models/Car');
const Services = require('../models/Services');
const Payment = require('../models/Payment');

const router = express.Router();

// GET bill by RecordNumber
router.get('/:recordNumber', async (req, res) => {
  try {
    const recordNumber = parseInt(req.params.recordNumber);
    const serviceRecord = await ServiceRecord.findOne({ RecordNumber: recordNumber });
    if (!serviceRecord) return res.status(404).json({ message: 'Bill not found' });

    const car = await Car.findOne({ PlateNumber: serviceRecord.PlateNumber });
    const service = await Services.findOne({ ServiceCode: serviceRecord.ServiceCode });
    const payment = await Payment.findOne({ RecordNumber: recordNumber });

    const bill = {
      RecordNumber: serviceRecord.RecordNumber,
      ServiceDate: serviceRecord.ServiceDate,
      PlateNumber: car ? car.PlateNumber : null,
      type: car ? car.type : null,
      Model: car ? car.Model : null,
      DriverPhone: car ? car.DriverPhone : null,
      MechanicName: car ? car.MechanicName : null,
      ServiceName: service ? service.ServiceName : null,
      ServicePrice: service ? service.ServicePrice : null,
      AmountPaid: payment ? payment.AmountPaid : null,
      PaymentDate: payment ? payment.PaymentDate : null
    };

    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
