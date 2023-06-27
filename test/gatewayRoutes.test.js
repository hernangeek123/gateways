const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Gateway = require('../models/gateway');

chai.use(chaiHttp);
chai.should();

describe('Gateway routes', () => {
  beforeEach(async () => {
    // Add some sample gateways to the database before each test
    const gateways = [
      {
        name: 'Gateway 1',
        serialNumber: '12345678',
        ipAddress: '192.168.1.1',
        peripherals: ['peripheral1', 'peripheral2']
      },
      {
        name: 'Gateway 2',
        serialNumber: '87654321',
        ipAddress: '192.168.1.2',
        peripherals: ['peripheral3', 'peripheral4']
      }
    ];
    await Gateway.insertMany(gateways);
  });

  afterEach(async () => {
    // Remove all gateways from the database after each test
    await Gateway.deleteMany();
  });

  describe('GET /api/gateways', () => {
    it('should return all gateways', async () => {
      const res = await chai.request(app).get('/api/gateways');
      res.should.have.status(200);
      res.body.should.be.an('array');
      res.body.length.should.equal(2);
      res.body[0].name.should.equal('Gateway 1');
      res.body[1].name.should.equal('Gateway 2');
    });
  });

  describe('GET /api/gateways/:id', () => {
    it('should return a specific gateway by ID', async () => {
      const gateways = await Gateway.find();
      const res = await chai.request(app).get(`/api/gateways/${gateways[0]._id}`);
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.name.should.equal('Gateway 1');
      res.body.serialNumber.should.equal('12345678');
    });

    it('should return a 404 error if the gateway ID is invalid', async () => {
      const res = await chai.request(app).get('/api/gateways/invalid_id');
      res.should.have.status(404);
      res.body.should.be.an('object');
      res.body.message.should.equal('Gateway not found');
    });
  });

  describe('POST /api/gateways', () => {
    it('should add a new gateway to the database', async () => {
      const gateway = {
        name: 'Gateway 3',
        serialNumber: '13579864',
        ipAddress: '192.168.1.3',
        peripherals: ['peripheral5', 'peripheral6']
      };
      const res = await chai.request(app).post('/api/gateways').send(gateway);
      res.should.have.status(201);
      res.body.should.be.an('object');
      res.body.name.should.equal('Gateway 3');
      res.body.serialNumber.should.equal('13579864');
    });

    it('should return a 400 error if the gateway data is invalid', async () => {
      const gateway = {
        name: 'Gateway 4',
        ipAddress: '192.168.1.4'
      };
      const res = await chai.request(app).post('/api/gateways').send(gateway);
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.message.should.equal('Validation failed: serialNumber: Path `serialNumber` is required.');
    });
  });

  describe('PUT /api/gateways/:id', () => {
    it('should update an existing gateway in the database', async () => {
      const gateways = await Gateway.find();
      const gateway = {
        name: 'Gateway 1 Updated',
        serialNumber: '12345678',
        ipAddress: '192.168.1.1',
        peripherals: ['peripheral1', 'peripheral2', 'peripheral3']
      };
      const res = await chai.request(app).put(`/api/gateways/${gateways[0]._id}`).send(gateway);
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.name.should.equal('Gateway 1 Updated');
      res.body.peripherals.should.have.lengthOf(3);
    });

    it('should return a 404 error if the gateway ID is invalid', async () => {
      const gateway = {
        name: 'Gateway 4',
        serialNumber: '24681357',
        ipAddress: '192.168.1.4',
        peripherals: ['peripheral7', 'peripheral8']
      };
      const res = await chai.request(app).put('/api/gateways/:invalid_id').send(gateway);
      res.should.have.status(404);
      res.body.should.be.an('object');
      res.body.message.should.equal('Gateway not found');
    });

    it('should return a 400 error if the gateway data is invalid', async () => {
      const gateways = await Gateway.find();
      const gateway = {
        name: 'Gateway 1 Updated',
        ipAddress: '192.168.1.1',
        peripherals: ['peripheral1', 'peripheral2', 'peripheral3']
      };
      const res = await chai.request(app).put(`/api/gateways/${gateways[0]._id}`).send(gateway);
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.message.should.equal('Validation failed: serialNumber: Path `serialNumber` is required.');
    });
  });

  describe('DELETE /api/gateways/:id', () => {
    it('should delete a specific gateway by ID', async () => {
      const gateways = await Gateway.find();
      const res = await chai.request(app).delete(`/api/gateways/${gateways[0]._id}`);
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.message.should.equal('Gateway deleted successfully');
      const remainingGateways = await Gateway.find();
      remainingGateways.should.have.lengthOf(1);
    });

    it('should return a 404 error if the gateway ID is invalid', async () => {
      const res = await chai.request(app).delete('/api/gateways/invalid_id');
      res.should.have.status(404);
      res.body.should.be.an('object');
      res.body.message.should.equal('Gateway not found');
    });
  });
});