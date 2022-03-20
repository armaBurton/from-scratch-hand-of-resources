const pool = require('../utils/pool');

module.exports = class Hamburger{
  id;
  name;
  bun;
  patty;
  bacon;
  cheese;
  toppings;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.bun = row.bun;
    this.patty = row.patty;
    this.bacon = row.bacon;
    this.cheese = row.cheese;
    this.toppings = row.toppings;
  }

  static async getAll(){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          hamburgers
      `
    );

    return rows.map(row => new Hamburger(row));
  }

};
