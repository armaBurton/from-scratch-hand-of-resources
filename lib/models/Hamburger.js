const pool = require('../utils/pool');

module.exports = class Hamburger{
  id;
  name;
  bun;
  patty;
  bacon;
  cheese;
  toppings;
  sauce;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.bun = row.bun;
    this.patty = row.patty;
    this.bacon = row.bacon;
    this.cheese = row.cheese;
    this.toppings = row.toppings;
    this.sauce = row.sauce;
  }

  static async insert(hamburger){
    console.log(`|| hamburger >`, hamburger);
    const { rows } = await pool.query(
      `
        INSERT INTO hamburgers(
          name, 
          bun, 
          patty, 
          bacon, 
          cheese, 
          toppings, 
          sauce
        )
        VALUES
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          *
      `,
      [
        hamburger.name,
        hamburger.bun,
        hamburger.patty,
        hamburger.bacon,
        hamburger.cheese,
        hamburger.toppings,
        hamburger.sauce
      ]
    );

    return new Hamburger(rows[0]);
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

  static async getById(id){
    const { rows } = await pool.query(
      `
        SELECT 
          *
        FROM
          hamburgers
        WHERE
          id=$1
      `,
      [id]
    );

    return new Hamburger(rows[0]);
  }

};
