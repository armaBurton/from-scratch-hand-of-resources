const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dragon = require('../lib/models/Dragon');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should return a list of all dragons', async () => {
    const expected = await Dragon.getAll();

    const res = await request(app)
      .get('/api/v1/dragons');
  
    expect(res.body).toEqual(expected);
  });
});
