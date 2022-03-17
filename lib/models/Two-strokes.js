const { request } = require('../app');
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

  // static async touch() {
  //   return 'You touched the DB';
  // }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          two_strokes
      `
    ); 
    
    return rows.map(row => new TwoStroke(row));
  }

  static async getMotoById(id){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          two_strokes
        WHERE
          id=$1
      `, [id]
    );

    return new TwoStroke(rows[0]);
  }
};
