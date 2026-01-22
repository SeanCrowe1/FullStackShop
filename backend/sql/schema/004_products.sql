-- +goose Up
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    price NUMERIC NOT NULL
);

-- +goose Down
DROP TABLE products;