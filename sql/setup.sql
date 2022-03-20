-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS two_strokes;
DROP TABLE IF EXISTS flight_controllers;
DROP TABLE IF EXISTS dragons;
DROP TABLE IF EXISTS hamburgers;
DROP TABLE IF EXISTS colors;

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

CREATE TABLE dragons(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  age TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  ac INT NOT NULL,
  hp TEXT NOT NULL,
  speed TEXT[] NOT NULL,
  stats JSON NOT NULL
);

INSERT INTO
  dragons(
    age,
    color,
    description,
    ac,
    hp,
    speed,
    stats
  )
VALUES
  (
    'Adult',
    'Blue',
    'Huge dragon, lawful evil',
    19,
    '18d12+108',
    ARRAY ['40 ft', 'burrow 30 ft', 'fly 80 ft'],
    '{"STR": "25(+7)", "DEX": "10(+0)", "CON": "23(+6)", "INT": "16(+3)", "WIS": "15(+2)", "CHA": "19(+4)"}'
  ),
  (
    'Ancient',
    'Black',
    'Gargantuan dragon, chaotic evil',
    22,
    '21d20+147',
    ARRAY ['40 ft', 'fly 80 ft', 'swim 40 ft'],
    '{"STR": "27(+8)", "DEX": "14(+2)", "CON": "25(+7)", "INT": "16(+3)", "WIS": "15(+2)", "CHA": "19(+4)"}'
  );

CREATE TABLE hamburgers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bun TEXT NOT NULL,
  name TEXT NOT NULL,
  patty TEXT NOT NULL,
  bacon BOOLEAN NOT NULL,
  cheese TEXT,
  toppings TEXT[],
  sauce TEXT[]
);

INSERT INTO hamburgers (
  name,
  bun,
  patty, 
  bacon,
  cheese,
  toppings,
  sauce
)
VALUES
  (
    'Blue Cheese Pretzel Burger with Bacon', 
    'Pretzel', 
    'Beef', 
    true, 
    'Blue',
    '{"Onion", "Pickle", "Tomato"}',
    '{"Mayonnaise", "Coarse Mustard"}'
  ),
  (
    'Chicken Kaiser Burger with Provolone',
    'Kaiser', 
    'Chicken', 
    false, 
    'Provolone',
    '{"Onion", "Pickle"}',
    '{"Mayonnaise", "Coarse Mustard", "BBQ Sauce"}'
  );  

CREATE TABLE colors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  css TEXT NOT NULL,
  hex TEXT NOT NULL,
  rgb INT[] NOT NULL,
  cmyk INT[] NOT NULL,
  hsb INT[] NOT NULL,
  lab INT[] NOT NULL
);

INSERT INTO colors (
  css,
  hex,
  rgb,
  cmyk,
  hsb,
  lab
)
VALUES
  (
    'Fuchsia', 
    'FF00FF', 
    '{255, 0, 255}',
    '{0, 100, 0, 0}',
    '{300, 100, 100}',
    '{60, 98, -61}'
  ),
  (
    'Aqua',
    '00FFFF',
    '{0, 255, 255}',
    '{100, 0, 0, 0}',
    '{180, 100, 100}',
    '{91, -48, 14}'
  );
