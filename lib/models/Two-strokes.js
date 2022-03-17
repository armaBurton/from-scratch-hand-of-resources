const pool = require('../utils/pool');

module.exports = class TwoStroke {
  id;
  manufacturer;
  name;
  cost;
  img;

  constructor(row) {
    this.id = row.id;
    this.manufacturer = row.manufacturer;
    this.name = row.name;
    this.cost = row.cost;
    this.img = row.img;
  }

  static async touch() {
    return 'You touched the DB';
  }
};
