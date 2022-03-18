const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const FlightController = require('../lib/models/Flight-controller');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should return a list of all objects', async () => {
    const expected = await FlightController.getAll();
    
    const res = await request(app)
      .get('/api/v1/flight_controllers');

    expect(res.body).toEqual(expected);
  });

  it('should return an object based on it`s id', async () => {
    const expected = {
      id: expect.any(String),
      manufacturer: 'Holybro',
      stack_name: 'Kakute H7 Mini Stack',
      fc_name: 'Kakute H7 FC',
      esc_name: 'Tekko32 F4 45A ESC',
      input_voltage: '2-6s',
      mounting: '20x20mm',
      cost: '$118.99',
      backordered: true,
      img: 'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/o/holybro-mini-stack---kakute-h7-fc-_-tekko32-f4-45a-esc---20x20-main.jpg',
    };

    const res = await request(app)
      .get('/api/v1/flight_controllers/1');

    expect(res.body).toEqual(expected);
  });

  it('should add and object to the DB', async () => {
    const expected = {
      id: expect.any(String),
      manufacturer: 'Diatone',
      stack_name: 'Diatone Mamba DJI F405 MK2 FC 55A Stack',
      fc_name: 'Mamba DJI F405 MK2',
      esc_name: 'DIATONE MAMBA F55 55A 128K ESC',
      input_voltage: '3-6s',
      mounting: ' 30.5mm,M3',
      cost: '$93.99',
      backordered: true,
      img: 'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diatone_mamba_sack_dji_f405_55a_128k_escdji-mamba-stack-f405-55a-128k-front-low_res-width-1000px.jpg',
    };

    const res = await request(app)
      .post('/api/v1/flight_controllers')
      .send({
        manufacturer: 'Diatone',
        stack_name: 'Diatone Mamba DJI F405 MK2 FC 55A Stack',
        fc_name: 'Mamba DJI F405 MK2',
        esc_name: 'DIATONE MAMBA F55 55A 128K ESC',
        input_voltage: '3-6s',
        mounting: ' 30.5mm,M3',
        cost: '$93.99',
        backordered: true,
        img: 'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diatone_mamba_sack_dji_f405_55a_128k_escdji-mamba-stack-f405-55a-128k-front-low_res-width-1000px.jpg'
      });
    
    expect(res.body).toEqual(expected);
  });

  it('should update an object in the db based on it`s id', async () => {
    const expected = {
      id: expect.any(String),
      manufacturer: 'Holybro',
      stack_name: 'Kakute H7 Mini Stack',
      fc_name: 'Kakute H7 FC',
      esc_name: 'Tekko32 F4 45A ESC',
      input_voltage: '2-6s',
      mounting: '20x20mm',
      cost: '$118.99',
      backordered: false,
      img: 'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/o/holybro-mini-stack---kakute-h7-fc-_-tekko32-f4-45a-esc---20x20-main.jpg'
    };

    const res = await request(app)
      .patch('/api/v1/flight_controllers/1')
      .send({ backordered: false });

    expect(res.body).toEqual(expected);
  });

  it('should delete an object', async () => {
    const expected = {
      id: expect.any(String),
      manufacturer: 'Holybro',
      stack_name: 'Kakute H7 Mini Stack',
      fc_name: 'Kakute H7 FC',
      esc_name: 'Tekko32 F4 45A ESC',
      input_voltage: '2-6s',
      mounting: '20x20mm',
      cost: '$118.99',
      backordered: true,
      img: 'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/o/holybro-mini-stack---kakute-h7-fc-_-tekko32-f4-45a-esc---20x20-main.jpg'
    };

    const res = await request(app)
      .delete('/api/v1/flight_controllers/1');

    expect(res.body).toEqual(expected);
    expect(await FlightController.getById(1)).toBeNull();
  });

});
