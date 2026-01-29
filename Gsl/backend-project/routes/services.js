const express = require('express');
const Services = require('../models/Services');

const router = express.Router();

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new service
router.post('/', async (req, res) => {
  try {
    const { ServiceName, ServicePrice } = req.body;
    const lastService = await Services.findOne().sort({ ServiceCode: -1 });
    const ServiceCode = lastService ? lastService.ServiceCode + 1 : 1;
    const service = new Services({ ServiceCode, ServiceName, ServicePrice: parseFloat(ServicePrice) });
    await service.save();
    res.json({ message: 'Service added', id: service._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
