package main

import (
	"context"
	"database/sql"
	"log"
	"net/http"

	"FullStackShopProj/internal/database"

	"github.com/google/uuid"
)

func (cfg *apiConfig) handlerCreateUser(w http.ResponseWriter, r *http.Request) {
	_, err := cfg.db.CreateCustomer(context.Background(), database.CreateCustomerParams{
		ID:        uuid.New(),
		FirstName: "James",
		LastName:  "Smith",
		Email:     "james.smith@email.com",
		Address1: sql.NullString{
			String: "12 High Street",
			Valid:  true,
		},
		Address2: sql.NullString{
			String: "Apt 4B",
			Valid:  true,
		},
		PostalCode: "SW1A 1AA",
	})

	if err != nil {
		log.Fatalf("Couldn't create user: %s", "James")
	}

}
