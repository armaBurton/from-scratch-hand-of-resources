const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const TwoStroke = require('../lib/models/Two-strokes');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('it should return a string', async () => {
    const res = await request(app)
      .get('/api/v1/two_strokes');

    expect(res.body).toEqual('You touched the DB');
  });

  it('it should return a string', async () => {
    const expected = await TwoStroke.touch();

    expect(expected).toEqual('You touched the DB');
  });

});
