const pool = require('../utils/pool');

module.exports = class FlightController {
  id;
  manufacturer;
  stack_name;
  fc_name;
  esc_name;
  input_voltage;
  mounting;
  cost;
  backordered;
  img;

  constructor(row){
    this.id = row.id;
    this.manufacturer = row.manufacturer;
    this.stack_name = row.stack_name;
    this.fc_name = row.fc_name;
    this.esc_name = row.esc_name;
    this.input_voltage = row.input_voltage;
    this.mounting = row.mounting;
    this.cost = row.cost;
    this.backordered = row.backordered;
    this.img = row.img;
  }

  static async getAll(){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          flight_controllers
      `
    );

    return rows.map(row => new FlightController(row));
  }
};
