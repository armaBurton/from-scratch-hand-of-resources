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

  
};
