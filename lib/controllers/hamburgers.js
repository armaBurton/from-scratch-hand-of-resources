const { Router } = require('express');
const Hamburger = require('../models/Hamburger');

module.exports = Router()

  .post('/', async (req, res, next) => {
    console.log('|| req.body >', req.body);
    const hamburger = await Hamburger.insert(req.body);
    
    res.json(hamburger);
  })

  .get('/', async (req, res, next) => {
    const hamburger = await Hamburger.getAll();

    try{
      if (!hamburger){
        const error = new Error('No such hamburger');
        error.status = 404;
        throw error;
      }
    
      res.json(hamburger);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const hamburger = await Hamburger.getById(id);

    try{
      if (!hamburger){
        const error = new Error('No such hamburger');
        error.status = 404;
        throw error;
      }
    
      res.json(hamburger);
    } catch (error) {
      next(error);
    }
  
  })
  
  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const hamburger = await Hamburger.getById(id);

    try{
      if (!hamburger){
        const error = new Error('No such hamburger');
        error.status = 404;
        throw error;
      }

      const hamburgerObj = {
        bun: req.body.bun ?? hamburger.bun,
        name: req.body.name ?? hamburger.name,
        patty: req.body.patty ?? hamburger.patty,
        bacon: req.body.bacon ?? hamburger.bacon,
        cheese: req.body.cheese ?? hamburger.cheese,
        toppings: req.body.toppings ?? hamburger.toppings,
        sauce: req.body.sauce ?? hamburger.sauce,
      };

      const updateHamburger = await Hamburger.updateHamburger(id, hamburgerObj);
    
      res.json(updateHamburger);
    } catch (error) {
      next(error);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    
    const hamburger = await Hamburger.delete(id);

    try{
      if (!hamburger){
        const error = new Error('No Such Hamburger');
        error.status = 404;
        throw error;
      }
    
      res.json(hamburger);
    } catch (error) {
      next(error);
    }
    
  });
