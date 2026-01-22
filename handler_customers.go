package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"FullStackShopProj/internal/database"
)

type Customer struct {
	ID         int64  `json:"id"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Email      string `json:"email"`
	Address1   string `json:"address1"`
	Address2   string `json:"address2"`
	PostalCode string `json:"postcode"`
}

func (cfg *apiConfig) handlerGetCustomer(w http.ResponseWriter, r *http.Request) {
	/*
		TO DO: Write logic for checking if customer details exist in database already

		(Separate functions for logging in as existing customer and creating new customer?)
	*/
}

func (cfg *apiConfig) handlerCreateCustomer(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		Email     string `json:"email"`
		Address1  string `json:"address1"`
		Address2  string `json:"address2"`
		PostCode  string `json:"postCode"`
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't decode parameters", err)
		return
	}

	dbCust, err := cfg.db.CreateCustomer(r.Context(), database.CreateCustomerParams{
		FirstName: params.FirstName,
		LastName:  params.LastName,
		Email:     params.Email,
		Address1: sql.NullString{
			String: params.Address1,
			Valid:  true,
		},
		Address2: sql.NullString{
			String: params.Address2,
			Valid:  true,
		},
		PostalCode: params.PostCode,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't create note", err)
		return
	}

	custResp := databaseCustToCust(dbCust)

	respondWithJSON(w, http.StatusCreated, custResp)
}

func databaseCustToCust(user database.Customer) Customer {
	add1, add2 := "", ""
	if user.Address1.Valid == true {
		add1 = user.Address1.String
	}
	if user.Address2.Valid == true {
		add2 = user.Address2.String
	}
	return Customer{
		ID:         user.ID,
		FirstName:  user.FirstName,
		LastName:   user.LastName,
		Email:      user.Email,
		Address1:   add1,
		Address2:   add2,
		PostalCode: user.PostalCode,
	}
}
