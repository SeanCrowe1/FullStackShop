-- +goose Up
CREATE TABLE products (
    id UUID PRIMARY KEY,
    product_name TEXT NOT NULL,
    price NUMERIC NOT NULL
);

-- +goose Down
DROP TABLE products;