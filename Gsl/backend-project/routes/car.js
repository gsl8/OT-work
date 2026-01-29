const express = require('express');
const Car = require('../models/Car');

const router = express.Router();

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new car
router.post('/', async (req, res) => {
  try {
    const { PlateNumber, type, Model, ManufacturingYear, DriverPhone, MechanicName } = req.body;
    const car = new Car({ PlateNumber, type, Model, ManufacturingYear, DriverPhone, MechanicName });
    await car.save();
    res.json({ message: 'Car added', id: car._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
