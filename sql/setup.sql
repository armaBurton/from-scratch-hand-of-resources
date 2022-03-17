-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS two_strokes;

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