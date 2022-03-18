const { Router } = require('express');
const res = require('express/lib/response');
const Dragon = require('../models/Dragon');

module.exports = Router()
  .get('/', async (req, res) => {
    const dragons = await Dragon.getAll();

    console.log('|| dragons >', dragons);
    res.json(dragons);
  });
