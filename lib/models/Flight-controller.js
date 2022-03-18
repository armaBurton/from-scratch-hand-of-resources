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

  static async insert(object){
    const { rows } = await pool.query(
      `
        INSERT INTO flight_controllers(
          manufacturer,
          stack_name,
          fc_name,
          esc_name,
          input_voltage,
          mounting,
          cost,
          backordered,
          img
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `,
      [
        object.manufacturer,
        object.stack_name,
        object.fc_name,
        object.esc_name,
        object.input_voltage,
        object.mounting,
        object.cost,
        object.backordered,
        object.img,
      ]
    );

    return new FlightController(rows[0]);
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

  static async getById(id){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          flight_controllers
        WHERE
          id=$1
      `,
      [id]
    );
    return new FlightController(rows[0]);
  }
};
