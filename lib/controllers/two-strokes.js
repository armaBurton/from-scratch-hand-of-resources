const { Router } = require('express');
const TwoStroke = require('../models/Two-strokes');

module.exports = Router()
// .get('/', async (req, res) => {
//   const test = await TwoStroke.touch();
  
//   res.json(test);
// })
  .post('/', async (req, res) => {
    const moto = await TwoStroke.insert({ ...req.body });

    res.json(moto);
  })
  
  .get('/', async (req, res) => {
    const moto = await TwoStroke.getAll();

    res.json(moto);
  })
  
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const moto = await TwoStroke.getMotoById(id);
    
    res.json(moto);
  })
  
  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const getMoto = await TwoStroke.getMotoById(id);

    try {
      if (!getMoto) {
        const error = new Error(`Motorcycle ${id} not found`);
        error.status = 404;
        throw error;
      }
      const motoObj = {
        manufacturer: req.body.manufacturer ?? getMoto.manufacturer,
        name: req.body.name ?? getMoto.name,
        cost: req.body.cost ?? getMoto.cost,
        img: req.body.img ?? getMoto.img,
      };

      const updateMoto = await TwoStroke.updateById(id, motoObj);

      res.send(updateMoto);
    } catch (error) {
      next(error);
    }
  })
  
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    const moto = await TwoStroke.deleteById(id);

    res.json(moto);
  });
