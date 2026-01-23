-- name: CreateCustomer :one
INSERT INTO customers (first_name, last_name, email, address_1, address_2, postal_code)
VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
)
RETURNING *;

-- name: GetCustomerByEmail :one
SELECT * FROM customers
WHERE email = ?;

-- name: GetCustomerByID :one
SELECT * FROM customers
WHERE id = ?;