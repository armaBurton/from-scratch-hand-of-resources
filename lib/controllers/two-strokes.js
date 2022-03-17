const { Router } = require('express');
const TwoStroke = require('../models/Two-strokes');

module.exports = Router()
  .get('/', async (req, res) => {
    const test = await TwoStroke.touch();
    console.log('|| test >', test);
    
    res.json(test);
  });
