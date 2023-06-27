const mongoose = require('mongoose');

const gatewaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  ipAddress: { type: String, required: true },
  peripherals: [{ 
    uid: { type: String, required: true },
    vendor: { type: String, required: true },
    status: { type: String, required: true },
  }],
  maxPeripherals: { type: Number, default: 0, max: 10 }
});

const Gateway = mongoose.model('Gateway', gatewaySchema);

module.exports = Gateway;