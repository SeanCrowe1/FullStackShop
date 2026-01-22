-- +goose Up
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL REFERENCES customers (id) ON DELETE CASCADE,
    region_id INTEGER NOT NULL REFERENCES regions (id) ON DELETE CASCADE,
    order_date TIMESTAMP NOT NULL,
    status TEXT NOT NULL
);

-- +goose Down
DROP TABLE orders;