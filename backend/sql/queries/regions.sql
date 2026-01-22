-- name: GetRegionByName :one
SELECT * FROM regions
WHERE region_name = ?;