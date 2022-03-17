const { Router } = require('express');
const TwoStroke = require('../models/Two-strokes');

module.exports = Router()
// .get('/', async (req, res) => {
//   const test = await TwoStroke.touch();
  
//   res.json(test);
// })
  
  .get('/', async (req, res) => {
    const moto = await TwoStroke.getAll();

    res.json(moto);
  })
  
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const moto = await TwoStroke.getMotoById(id);
    
    res.json(moto);
  });
