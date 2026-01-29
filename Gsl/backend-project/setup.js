const mongoose = require('./db');
const Services = require('./models/Services');
const Car = require('./models/Car');
const User = require('./models/User');

(async function main() {
  try {
    console.log('Seeding data (if missing)...');

    // Seed Services
    const services = [
      { ServiceCode: 1, ServiceName: 'Engine repair', ServicePrice: 150000 },
      { ServiceCode: 2, ServiceName: 'Transmission repair', ServicePrice: 80000 },
      { ServiceCode: 3, ServiceName: 'Oil Change', ServicePrice: 60000 },
      { ServiceCode: 4, ServiceName: 'Chain replacement', ServicePrice: 40000 },
      { ServiceCode: 5, ServiceName: 'Disc replacement', ServicePrice: 400000 },
      { ServiceCode: 6, ServiceName: 'Wheel alignment', ServicePrice: 5000 }
    ];

    for (const svc of services) {
      const existing = await Services.findOne({ ServiceCode: svc.ServiceCode });
      if (!existing) {
        await Services.create(svc);
        console.log(`Seeded service: ${svc.ServiceName}`);
      } else {
        console.log(`Service already exists: ${svc.ServiceName}`);
      }
    }

    // Seed Cars
    const cars = [
      { PlateNumber: 'ABC123', type: 'Sedan', Model: 'Toyota Camry', ManufacturingYear: 2020, DriverPhone: '1234567890', MechanicName: 'John Doe' },
      { PlateNumber: 'DEF456', type: 'SUV', Model: 'Honda CRV', ManufacturingYear: 2019, DriverPhone: '0987654321', MechanicName: 'Jane Smith' }
    ];

    for (const car of cars) {
      const existing = await Car.findOne({ PlateNumber: car.PlateNumber });
      if (!existing) {
        await Car.create(car);
        console.log(`Seeded car: ${car.PlateNumber}`);
      } else {
        console.log(`Car already exists: ${car.PlateNumber}`);
      }
    }

    // Seed User
    const existingUser = await User.findOne({ username: 'admin' });
    if (!existingUser) {
      await User.create({ id: 1, username: 'admin', password: 'password' });
      console.log('Seeded user: admin / password');
    } else {
      console.log('User already exists: admin');
    }

    console.log('Database setup completed.');
    process.exit(0);
  } catch (err) {
    console.error('Database setup failed:', err);
    process.exit(1);
  }
})();
