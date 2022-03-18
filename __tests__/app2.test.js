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
});
