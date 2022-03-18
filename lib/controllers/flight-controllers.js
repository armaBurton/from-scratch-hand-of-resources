const { Router } = require('express');
const { restart } = require('nodemon');
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
  })
  
  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;

    const flightController = await FlightController.getById(id);

    try{
      if(!flightController){
        const error = new Error('object not found');
        error.status = 404;
        throw error;
      }

      const fcObj = {
        manufacturer: req.body.manufacturer ?? flightController.manufacturer,
        stack_name: req.body.stack_name ?? flightController.stack_name,
        fc_name: req.body.fc_name ?? flightController.fc_name,
        esc_name: req.body.esc_name ?? flightController.esc_name,
        input_voltage: req.body.input_voltage ?? flightController.input_voltage,
        mounting: req.body.mounting ?? flightController.mounting,
        cost: req.body.cost ?? flightController.cost,
        backordered: req.body.backordered ?? flightController.backordered,
        img: req.body.img ?? flightController.img
      };

      const updateFC = await FlightController.updateById(id, fcObj);

      res.send({ ...updateFC });
    } catch (error) {
      next(error);
    }
  });
