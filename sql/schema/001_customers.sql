-- +goose Up
CREATE TABLE customers (
    id UUID PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    address_1 TEXT,
    address_2 TEXT,
    postal_code TEXT NOT NULL
);

-- +goose Down
DROP TABLE customers;