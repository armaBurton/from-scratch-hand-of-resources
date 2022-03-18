const { Router } = require('express');
const FlightController = require('../models/Flight-controller');

module.exports = Router()
  .get('/', async (req, res) => {
    console.log('getGETGETGET*************************');
    const flightController = await FlightController.getAll();

    console.log(`|| flightController.body >`, flightController.body);

    res.json(flightController);
  });
