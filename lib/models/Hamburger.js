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
    
    if (!rows[0]) return null;
    return new Hamburger(rows[0]);
  }

  static async updateHamburger(id, hamburgerObj){
    const { rows } = await pool.query(
      `
        UPDATE
          hamburgers
        SET
          bun=$1,
          name=$2,
          patty=$3,
          bacon=$4,
          cheese=$5,
          toppings=$6,
          sauce=$7
        WHERE
          id=$8
        RETURNING
          *
      `,
      [
        hamburgerObj.bun,
        hamburgerObj.name,
        hamburgerObj.patty,
        hamburgerObj.bacon,
        hamburgerObj.cheese,
        hamburgerObj.toppings,
        hamburgerObj.sauce,
        id
      ]
    );
    return new Hamburger(rows[0]);
  }

  static async delete(id){
    const { rows } = await pool.query(
      `
        DELETE FROM
          hamburgers
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id]
    );
    return new Hamburger(rows[0]);
  }
};
