-- +goose Up
CREATE TABLE regions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    region_name TEXT NOT NULL,
    shipping_rate NUMERIC NOT NULL
);

-- +goose Down
DROP TABLE regions;