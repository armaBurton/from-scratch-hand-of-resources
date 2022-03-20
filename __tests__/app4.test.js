const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Hamburger = require('../lib/models/Hamburger');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should get an array of all hamburgers', async () => {
    const expected = await Hamburger.getAll();

    const res = await request(app)
      .get('/api/v1/hamburgers');

    expect(res.body).toEqual(expected);
  });

});
