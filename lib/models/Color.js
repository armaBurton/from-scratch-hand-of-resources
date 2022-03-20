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
