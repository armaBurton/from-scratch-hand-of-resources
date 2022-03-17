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
  });
