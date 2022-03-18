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

  it('should return a single dragon object that matches an ID', async () => {
    const expected = {
      id:expect.any(String),
      age:'Ancient',
      color:'Black',
      description:'Gargantuan dragon, chaotic evil',
      ac:22,
      hp:'21d20+147',
      speed:['40 ft', 'fly 80 ft', 'swim 40 ft'],
      stats:{
        STR: '27(+8)',
        DEX: '14(+2)',
        CON: '25(+7)',
        INT: '16(+3)',
        WIS: '15(+2)',
        CHA: '19(+4)'
      }
    };

    const res = await request(app)
      .get('/api/v1/dragons/2');

    expect(res.body).toEqual(expected);
  });

});
