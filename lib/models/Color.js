const pool = require('../utils/pool');

module.exports = class Color {
  id;
  css;
  hex;
  rgb;
  cmyk;
  hsb;
  lab;
  
  constructor(row){
    this.id = row.id;
    this.css = row.css;
    this.hex = row.hex;
    this.rgb = row.rgb;
    this.cmyk = row.cmyk;
    this.hsb = row.hsb;
    this.lab = row.lab;
  }

  static async insert(color){
    const { rows } = await pool.query(
      `
        INSERT INTO colors (
          css,
          hex,
          rgb,
          cmyk,
          hsb,
          lab
        )
        Values
          ($1, $2, $3, $4, $5, $6)
        RETURNING
          *
      `,
      [
        color.css,
        color.hex,
        color.rgb,
        color.cmyk,
        color.hsb,
        color.lab
      ]
    );

    return new Color(rows[0]);
  }

  static async getAll(){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          colors
      `
    );

    return rows.map(row => new Color(row));
  }

  static async getById(id){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          colors
        WHERE
          id=$1
      `,
      [id]
    );
    return new Color(rows[0]);
  }
};
