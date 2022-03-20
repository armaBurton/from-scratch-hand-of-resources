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

    if (!rows[0]) return null;
    return new Color(rows[0]);
  }

  static async update(id, colorObj){
    const { rows } = await pool.query(
      `
        UPDATE
          colors
        SET
          css=$1,
          hex=$2,
          rgb=$3,
          cmyk=$4,
          hsb=$5,
          lab=$6
        WHERE
          id=$7
        RETURNING
          *        
      `,
      [
        colorObj.css,
        colorObj.hex,
        colorObj.rgb,
        colorObj.cmyk,
        colorObj.hsb,
        colorObj.lab,
        id
      ]
    );
    
    return new Color(rows[0]);
  }

  static async delete(id){
    const { rows } = await pool.query(
      `
        DELETE FROM
          colors
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Color(rows[0]);
  }

};
