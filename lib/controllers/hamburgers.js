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
  
  });
