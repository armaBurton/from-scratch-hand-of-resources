const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Hamburger = require('../lib/models/Hamburger');

describe('alchemy-app routes', () => {
  const expectedArrayObj = [
    {
      id: expect.any(String),
      bun:'Pretzel',
      name:'Blue Cheese Pretzel Burger with Bacon',
      patty:'Beef',
      bacon:true,
      cheese: 'Blue',
      toppings: ['Onion', 'Pickle', 'Tomato'],
      sauce: ['Mayonnaise', 'Coarse Mustard']
    },
    {
      id: expect.any(String),
      bun:'Kaiser',
      name:'Chicken Kaiser Burger with Provolone',
      patty:'Chicken',
      bacon: false,
      cheese: 'Provolone',
      toppings: ['Onion', 'Pickle'],
      sauce: ['Mayonnaise', 'Coarse Mustard', 'BBQ Sauce']
    }
  ];

  const expectedObj1 = {
    id: expect.any(String),
    bun:'Pretzel',
    name:'Blue Cheese Pretzel Burger with Bacon',
    patty:'Beef',
    bacon:true,
    cheese: 'Blue',
    toppings: ['Onion', 'Pickle', 'Tomato'],
    sauce: ['Mayonnaise', 'Coarse Mustard']
  };

  const updateObj = {
    bun:'Pretzel',
    name:'Pineapple Teriyaki Burger with Ham',
    patty:'Beef',
    bacon: false,
    cheese: '',
    toppings: ['Onion', 'Pineapple', 'Ham'],
    sauce: ['Mayonnaise', 'Teriyaki']
  };


  const uploadObj = {
    bun:'Sesame',
    name:'Blue Cheese Pretzel Burger with Bacon',
    patty:'Beef',
    bacon:true,
    cheese: 'Cheddar',
    toppings: ['Onion', 'Pickled Jalapeno', 'Tomato', 'Lettuce'],
    sauce: ['Fry Sauce', 'Yellow Mustard']
  };

  const uploadObjReturn = {
    id: expect.any(String),
    bun:'Pretzel',
    name:'Pineapple Teriyaki Burger with Ham',
    patty:'Beef',
    bacon: false,
    cheese: '',
    toppings: ['Onion', 'Pineapple', 'Ham'],
    sauce: ['Mayonnaise', 'Teriyaki']
  };

  const deletedHamburger = {
    id: expect.any(String),
    bun:'Kaiser',
    name:'Chicken Kaiser Burger with Provolone',
    patty:'Chicken',
    bacon: false,
    cheese: 'Provolone',
    toppings: ['Onion', 'Pickle'],
    sauce: ['Mayonnaise', 'Coarse Mustard', 'BBQ Sauce']
  };

  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add an new hamburger to the array', async () => {
    const res = await request(app)
      .post('/api/v1/hamburgers/')
      .send(uploadObj);

    const expected = await Hamburger.getById(3);

    expect(res.body).toEqual(expected);
  });

  it('should get an array of all hamburgers', async () => {
    const expected = await Hamburger.getAll();

    const res = await request(app)
      .get('/api/v1/hamburgers');

    expect(res.body).toEqual(expected);
  });

  it('should return a hamburger that matches the id', async () => {
    const expectedObj1 = await Hamburger.getById(1);

    const res = await request(app)
      .get('/api/v1/hamburgers/1');

    expect(res.body).toEqual(expectedObj1);
  });

  it('should modify a hamburger with the matching Id', async () => {
    const res = await request(app)
      .patch('/api/v1/hamburgers/1')
      .send(updateObj);

    expect(res.body).toEqual(uploadObjReturn);
  });

  it('should delete a hamburger with matching id', async() => {
    const res = await request(app)
      .delete('/api/v1/hamburgers/2');

    expect(res.body).toEqual(deletedHamburger);
    expect(await Hamburger.getById(2)).toBeNull();
  });

});
