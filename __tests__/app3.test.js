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

  it('it should create a new instance of a dragon', async () => {
    const expected = {
      id: expect.any(String),
      age: 'Young',
      color: 'Silver',
      description: 'Large dragon, lawful good',
      ac: 18,
      hp: '16d10+80',
      speed:['40 ft', 'fly 80 ft'],
      stats:{
        STR: '23(+6)',
        DEX: '10(+0)',
        CON: '21(+5)',
        INT: '14(+2)',
        WIS: '11(+0)',
        CHA: '19(+4)'
      }
    };

    const res = await request(app)
      .post('/api/v1/dragons')
      .send({
        age: 'Young',
        color: 'Silver',
        description: 'Large dragon, lawful good',
        ac: 18,
        hp: '16d10+80',
        speed:['40 ft', 'fly 80 ft'],
        stats:{
          STR: '23(+6)',
          DEX: '10(+0)',
          CON: '21(+5)',
          INT: '14(+2)',
          WIS: '11(+0)',
          CHA: '19(+4)'
        }
      });
    
    expect(res.body).toEqual(expected);
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
