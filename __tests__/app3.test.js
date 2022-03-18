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

  it('should update a dragon object that matches ID', async () => {
    const expected = {
      id: expect.any(String),
      age:'Ancient',
      color:'Blue',
      description:'Gargantuan dragon, lawful evil',
      ac:22,
      hp:'26d20+208',
      speed:['40 ft', 'fly 80 ft', 'swim 40 ft'],
      stats:{
        STR: '29(+9)',
        DEX: '10(+0)',
        CON: '27(+8)',
        INT: '18(+4)',
        WIS: '17(+3)',
        CHA: '21(+5)'
      }
    };

    const res = await request(app)
      .patch('/api/v1/dragons/1')
      .send({
        age:'Ancient',
        color:'Blue',
        description:'Gargantuan dragon, lawful evil',
        ac:22,
        hp:'26d20+208',
        speed:['40 ft', 'fly 80 ft', 'swim 40 ft'],
        stats:{
          STR: '29(+9)',
          DEX: '10(+0)',
          CON: '27(+8)',
          INT: '18(+4)',
          WIS: '17(+3)',
          CHA: '21(+5)'
        }
      }); 

    expect(res.body).toEqual(expected);
  });

  it('should delete a dragon that matches Id', async () => {
    const res = await request(app)
      .delete('/api/va/dragons/1');

    if (!res[0]) return null;
    ret
  });

});
