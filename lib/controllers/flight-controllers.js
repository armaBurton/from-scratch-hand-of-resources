const { Router } = require('express');
const FlightController = require('../models/Flight-controller');

module.exports = Router()
  .post('/', async (req, res) => {
    const flightController = await FlightController.insert({ ...req.body });

    res.json(flightController);
  })

  .get('/', async (req, res) => {
    const flightController = await FlightController.getAll();

    res.json(flightController);
  })
  
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const flightController = await FlightController.getById(id);

    res.json(flightController);
  });
