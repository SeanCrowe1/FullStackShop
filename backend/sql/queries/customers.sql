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

-- name: GetCustomerByFirstName :one
SELECT * FROM customers
WHERE first_name = ?;

-- name: GetCustomerByID :one
SELECT * FROM customers
WHERE id = ?;