const { Router } = require('express');
const Hamburger = require('../models/Hamburger');

module.exports = Router()

  .get('/', async (req, res, next) => {
    const hamburger = await Hamburger.getAll();

    try{
      if (!hamburger){
        const error = new Error('No such hamburger');
        error.status = 404;
        throw error;
      }
    
      console.log('|| hamburger >', hamburger);
      res.json(hamburger);
    } catch (error) {
      next(error);
    }
  });
