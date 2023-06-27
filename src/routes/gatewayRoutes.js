const express = require('express');
const router = express.Router();
const { validatePeripherals, validateGateway } = require('../utils/validators');
const Gateway = require('../models/gateway');
const PeripheralDevice = require('../models/peripheralDevice');

// GET all gateways
router.get('/', async (req, res) => {
  try {
    const gateways = await Gateway.find().populate('peripherals');
    res.json(gateways);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET a gateway by ID
router.get('/:id', async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.id).populate('peripherals');
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }
    res.json(gateway);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST a new gateway
router.post('/', async (req, res) => {
  const { name, serialNumber, ipAddress, peripherals } = req.body;

  try {
    // Validate the request data
    validateGateway({ name, serialNumber, ipAddress, peripherals });
  } catch (err) {
    return res.status(400).send(err.message);
  }

  // Check if the gateway already exists
  try {
    const existingGateway = await Gateway.findOne({ serialNumber });
    if (existingGateway) {
      return res.status(409).json({ message: 'Gateway already exists' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  // Create a new gateway and save it to the database
  try {
    const newGateway = new Gateway({ name, serialNumber, ipAddress, peripherals, peripheralCount: peripherals.length });
    const gateway = await newGateway.save();
    res.status(201).json(gateway);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT update a gateway by ID
router.put('/:id', async (req, res) => {
  const { name, serialNumber, ipAddress, peripherals } = req.body;

  try {
    // Validate the request data
    validateGateway({ name, serialNumber, ipAddress, peripherals });
  } catch (err) {
    return res.status(400).send(err.message);
  }

  try {
    const gateway = await Gateway.findByIdAndUpdate(req.params.id, { name, serialNumber, ipAddress, peripherals, peripheralCount: peripherals.length }, { new: true }).populate('peripherals');
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }
    res.json(gateway);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a gateway by ID
router.delete('/:id', async (req, res) => {
  try {
    const gateway = await Gateway.findByIdAndDelete(req.params.id).populate('peripherals');
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }

    // Delete all the peripheral devices associated with the gateway
    await PeripheralDevice.deleteMany({ gateway: gateway._id });
    
    res.json({ message: 'Gateway deleted successfully', gateway });
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST a new peripheral device to a gateway
router.post('/:id/peripherals', async (req, res) => {
  const { uid, vendor, status } = req.body;

  // Validate the request data
  try {
    validatePeripherals([{ uid, vendor, status }]);
  } catch (err) {
    return res.status(400).send(err.message);
  }

  // Check if the gateway exists
  let gateway;
  try {
    gateway = await Gateway.findById(req.params.id);
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  // Limit the number of peripherals per gateway to 10
  if (gateway.peripheralCount >= 10) {
    return res.status(400).json({ message: 'Maximum number of peripherals per gateway is 10' });
  }

  // Create a new peripheral device and save it to the database
  try {
    const newPeripheralDevice = new PeripheralDevice({
      uid,
      vendor,
      status,
      gateway: req.params.id,
    });
    const peripheralDevice = await newPeripheralDevice.save();
    
    // Add the peripheral device to the gateway's peripherals array
    gateway.peripherals.push(peripheralDevice._id);
    gateway.peripheralCount +=1;
    await gateway.save();
     
    res.status(201).json(peripheralDevice);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;