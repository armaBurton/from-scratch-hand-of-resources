const { Router } = require('express');
const res = require('express/lib/response');
const Color = require('../models/Color');

module.exports = Router()

  .get('/', async (req, res, next) => {
    const color = await Color.getAll();

    try{
      if (!color){
        const error = new Error('Not Found');
        error.status = 404;
        throw error;
      }
    
      res.json(color);
    } catch (error) {
      next(error);
    }
  });
