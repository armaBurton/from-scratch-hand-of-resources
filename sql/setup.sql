-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS two_strokes;
DROP TABLE IF EXISTS flight_controllers;

CREATE TABLE two_strokes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  manufacturer TEXT NOT NULL,
  name TEXT NOT NULL,
  cost INT NOT NULL,
  img TEXT
);

INSERT INTO
  two_strokes(
    manufacturer,
    name,
    cost,
    img
  )
  VALUES
    ('GASGAS', 'EC300', 9749, 'https://dirtbikemagazine.com/wp-content/uploads/2021/09/05_GasGas_EC-250.jpg'),
    ('KTM', '300XC-W', 10499, 'https://dirtbikemagazine.com/wp-content/uploads/2021/09/09_KTM300-XC-W-TPI.jpg');

    
CREATE TABLE flight_controllers(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  manufacturer TEXT NOT NULL,
  stack_name TEXT NOT NULL,
  fc_name TEXT NOT NULL,
  esc_name TEXT NOT NULL,
  input_voltage TEXT NOT NULL,
  mounting TEXT NOT NULL,
  cost MONEY NOT NULL,
  backordered BOOLEAN NOT NULL,
  img TEXT NOT NULL
);

INSERT INTO
  flight_controllers(
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
  VALUES
    (
      'Holybro', 
      'Kakute H7 Mini Stack', 
      'Kakute H7 FC', 
      'Tekko32 F4 45A ESC', 
      '2-6s', 
      '20x20mm', 
      118.99, 
      true, 
      'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/o/holybro-mini-stack---kakute-h7-fc-_-tekko32-f4-45a-esc---20x20-main.jpg'
    ),
    (
      'SpeedyBee', 
      'SpeedyBee F7 Mini', 
      'SpeedyBee F7 Mini FC', 
      'SpeedyBee 35A BLHeli_S ESC', 
      '3-6S', 
      '20x20mm', 
      95.99, 
      false, 
      'https://cdn.getfpv.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/p/speedybee-mini-stack-35a_1_.jpg'
    );
