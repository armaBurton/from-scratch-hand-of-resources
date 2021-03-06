const pool = require('../utils/pool');

module.exports = class Dragon {
  id;
  age;
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

  static async insert(dragon){
    const { rows } = await pool.query(
      `
        INSERT INTO dragons(
          age,
          color,
          description,
          ac,
          hp,
          speed,
          stats
        )
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          *
      `,
      [
        dragon.age,
        dragon.color,
        dragon.description,
        dragon.ac,
        dragon.hp,
        dragon.speed,
        dragon.stats,
      ]
    );
    return new Dragon(rows[0]);
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
    return rows.map(row => new Dragon(row));
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

    if (!rows[0]) return null;
    return new Dragon(rows[0]);
  }

  static async upDateById(id, dragon){
    const { rows } = await pool.query(
      `
        UPDATE 
          dragons
        SET
          age = $1,
          color = $2,
          description = $3,
          ac = $4,
          hp = $5,
          speed = $6,
          stats = $7
        WHERE
          id = $8
        RETURNING
          *
      `,
      [
        dragon.age,
        dragon.color,
        dragon.description,
        dragon.ac,
        dragon.hp,
        dragon.speed,
        dragon.stats,
        id
      ]
    );

    return new Dragon(rows[0]);
  }
  
  static async delete(id){
    const { rows } = await pool.query(
      `
        DELETE FROM 
          dragons
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Dragon(rows[0]);
  }
};
