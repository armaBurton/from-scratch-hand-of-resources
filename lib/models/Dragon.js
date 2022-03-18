const pool = require('../utils/pool');

module.exports = class Dragon {
  id;
  color;
  description;
  ac;
  hp;
  speed;
  stats;

  constructor(row) {
    this.id = row.id;
    this.color = row.color;
    this.description = row.description;
    this.ac = row.ac;
    this.hp = row.hp;
    this.speed = row.speed;
    this.stats = row.stats;
  }

  static async getAll(){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          dragons
      `
    );
    console.log('|| rows >', rows);
    return new Dragon(rows[0]);
  }
  
};
