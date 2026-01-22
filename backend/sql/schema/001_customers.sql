-- +goose Up
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    address_1 TEXT,
    address_2 TEXT,
    postal_code TEXT NOT NULL
);

-- +goose Down
DROP TABLE customers;