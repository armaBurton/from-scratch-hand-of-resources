const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const color = await Color.insert(req.body);

    try{
      if (!color){
        const error = new Error('Negatory');
        error.status = 404;
        throw error;
      }
    
      res.json(color);
    } catch (error) {
      next(error);
    }
    
  })

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
  })
  
  .get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const color = await Color.getById(id);

    try{
      if (!color){
        const error = new Error('No such Color');
        error.status = 404;
        throw error;
      }
    
      res.json(color);
    } catch (error) {
      next(error);
    }
    
  })
  
  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const color = await Color.getById(id);

    const colorObj = {
      css: req.body.css ?? color.css,
      hex: req.body.hex ?? color.hex,
      rgb: req.body.rgb ?? color.rgb,
      cmyk: req.body.cmyk ?? color.cmyk,
      hsb: req.body.hsb ?? color.hsb,
      lab: req.body.lab ?? color.lab,
    };

    const updateColor = await Color.update(id, colorObj);

    res.json(updateColor);
  })
  
  .delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const color = await Color.delete(id);

    try{
      if (!color){
        const error = new Error('Negatory');
        error.status = 404;
        throw error;
      }
    
      res.json(color);
    } catch (error) {
      next(error);
    }
    
  });
