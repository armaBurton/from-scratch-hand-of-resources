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

  // it('it should return a string', async () => {
  //   const res = await request(app)
  //     .get('/api/v1/two_strokes');

  //   expect(res.body).toEqual('You touched the DB');
  // });

  
  it('should return an array of motorcycle objects', async () => {
    const expectArrObj = [{
      id: expect.any(String),
      manufacturer: 'GASGAS',
      name: 'EC300',
      cost: 9749,
      img: 'https://dirtbikemagazine.com/wp-content/uploads/2021/09/05_GasGas_EC-250.jpg'
    },
    {
      id: expect.any(String),
      manufacturer: 'KTM',
      name: '300XC-W',
      cost: 10499,
      img: 'https://dirtbikemagazine.com/wp-content/uploads/2021/09/09_KTM300-XC-W-TPI.jpg'
    }];

    const res = await request(app)
      .get('/api/v1/two_strokes');

    expect(res.body).toEqual(expectArrObj);
  });

});
