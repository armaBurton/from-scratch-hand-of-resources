const { Router } = require('express');
const res = require('express/lib/response');
const { restart } = require('nodemon');
const Dragon = require('../models/Dragon');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const dragons = await Dragon.insert(req.body);

    try{
      if(!dragons){
        const error = new Error('Whatchu talkin bout?');
        error.status = 404;
        throw error;
      }

      res.json(dragons);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    const dragons = await Dragon.getAll();
    
    try {
      if (!dragons) {
        const error = new Error('No Such Dragon');
        error.status = 404;
        throw error;
      }
  
      res.json(dragons);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const dragons = await Dragon.getById(id);

    try{
      if(!dragons){
        const error = new Error('No Such Dragon');
        error.status = 404;
        throw error;
      }

      res.json(dragons);
    } catch (error) {
      next(error);
    }
  })
  
  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const dragons = await Dragon.getById(id);

    try{
      if(!dragons){
        const error = new Error('No Such Dragon');
        error.status = 404;
        throw error;
      }

      const dragonObj = {
        age: req.body.age ?? dragons.age,
        color: req.body.color ?? dragons.color,
        description: req.body.description ?? dragons.description,
        ac: req.body.ac ?? dragons.ac,
        hp: req.body.hp ?? dragons.hp,
        speed: req.body.speed ?? dragons.speed,
        stats: req.body.stats ?? dragons.stats,
      };

      const updateDragon = await Dragon.upDateById(id, dragonObj);

      res.json(updateDragon);
    } catch (error) {
      next(error);
    }
  });
