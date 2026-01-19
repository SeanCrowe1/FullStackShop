-- +goose Up
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers (id) ON DELETE CASCADE,
    region_id UUID NOT NULL REFERENCES regions (id) ON DELETE CASCADE,
    order_date TIMESTAMP NOT NULL,
    status TEXT NOT NULL
);

-- +goose Down
DROP TABLE orders;