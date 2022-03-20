const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Color = require('../lib/models/Color');
const { get } = require('express/lib/response');

describe('alchemy-app routes', () => {
  const expectedArrayObj = [{
    id: expect.any(String),
    css:'Fuchsia',
    hex:'FF00FF',
    rgb:[255, 0, 255],
    cmyk:[0, 100, 0, 0],
    hsb:[300, 100, 100],
    lab:[60, 98, -61]
  },
  {
    id: expect.any(String),
    css:'Aqua',
    hex:'00FFFF',
    rgb:[0, 255, 255],
    cmyk:[100, 0, 0, 0],
    hsb:[180, 100, 100],
    lab:[91, -48, 14],
  }];

  const expectedObj1 = {
    id: expect.any(String),
    css:'Fuchsia',
    hex:'FF00FF',
    rgb:[255, 0, 255],
    cmyk:[0, 100, 0, 0],
    hsb:[300, 100, 100],
    lab:[60, 98, -61]
  };

  const uploadObj = {
    css:'Yellow',
    hex:'FFFF00',
    rgb:[255, 255, 0],
    cmyk:[0, 0, 100, 0],
    hsb:[60, 100, 100],
    lab:[97, -22, 44],
  };

  const uploadObjReturn = {
    id: expect.any(String),
    css:'Yellow',
    hex:'FFFF00',
    rgb:[255, 255, 0],
    cmyk:[0, 0, 100, 0],
    hsb:[60, 100, 100],
    lab:[97, -22, 44],
  };

  const updateObj = {
    css:'Chartreuse',
    hex:'7FFF00',
    rgb:[127, 255, 0],
    cmyk:[50, 0, 100, 0],
    hsb:[90, 100, 100],
    lab:[99, -68, 86],
  };

  const deletedColor = {
    id: expect.any(String),
    css:'Aqua',
    hex:'00FFFF',
    rgb:[0, 255, 255],
    cmyk:[100, 0, 0, 0],
    hsb:[180, 100, 100],
    lab:[91, -48, 14],
  };

  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should return an array of all color objects', async () => {
    const res = await request(app)
      .get('/api/v1/colors');

    expect(res.body).toEqual(expectedArrayObj);
  });

  it('should return a color object matching an ID', async () => {
    const res = await request(app)
      .get('/api/v1/colors/1');

    expect(res.body).toEqual(expectedObj1);
  });

  it('should add a new object to the list array', async () => {
    const res = await request(app)
      .post('/api/v1/colors')
      .send(uploadObj);

    expect(res.body).toEqual(uploadObjReturn);
  });

});
