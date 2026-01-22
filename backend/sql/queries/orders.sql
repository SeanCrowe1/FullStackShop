-- name: CreateOrder :one
INSERT INTO orders (customer_id, region_id, order_date, status)
VALUES (
    ?,
    ?,
    ?,
    ?
)
RETURNING *;