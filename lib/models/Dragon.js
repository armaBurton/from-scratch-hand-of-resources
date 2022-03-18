const pool = require('../utils/pool');

module.exports = class Dragon {
  id;
  age
  color;
  description;
  ac;
  hp;
  speed;
  stats;

  constructor(row) {
    this.id = row.id;
    this.age = row.age;
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
    return new Dragon(rows[0]);
  }

  static async getById(id){
    const { rows } = await pool.query(
      `
        SELECT 
          *
        FROM
          dragons
        WHERE
          id=$1
      `,
      [id]
    );

    return new Dragon(rows[0]);
  }
  
};
