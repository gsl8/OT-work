const express = require('express');
const ServiceRecord = require('../models/ServiceRecord');
const Car = require('../models/Car');
const Services = require('../models/Services');
const Payment = require('../models/Payment');

const router = express.Router();

// GET daily reports by date
router.get('/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const serviceRecords = await ServiceRecord.find({
      ServiceDate: { $gte: startOfDay, $lte: endOfDay }
    });

    const reports = [];
    for (const sr of serviceRecords) {
      const car = await Car.findOne({ PlateNumber: sr.PlateNumber });
      const service = await Services.findOne({ ServiceCode: sr.ServiceCode });
      const payment = await Payment.findOne({ RecordNumber: sr.RecordNumber });

      reports.push({
        RecordNumber: sr.RecordNumber,
        ServiceDate: sr.ServiceDate,
        PlateNumber: car ? car.PlateNumber : null,
        ServiceName: service ? service.ServiceName : null,
        ServicePrice: service ? service.ServicePrice : null,
        AmountPaid: payment ? payment.AmountPaid : null,
        PaymentDate: payment ? payment.PaymentDate : null
      });
    }

    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
