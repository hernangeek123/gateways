const mongoose = require('mongoose');

const peripheralDeviceSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  vendor: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  gateway: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gateway',
    required: true
  }
});

module.exports = mongoose.model('PeripheralDevice', peripheralDeviceSchema);