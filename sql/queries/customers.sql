-- name: CreateCustomer :one
INSERT INTO customers (id, first_name, last_name, email, address_1, address_2, postal_code)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
)
RETURNING *;

-- name: GetCustomerByFirstName :one
SELECT * FROM customers
WHERE first_name = $1;