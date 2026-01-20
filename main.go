package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync/atomic"
	"time"

	_ "github.com/lib/pq"

	"FullStackShopProj/internal/database"

	"github.com/joho/godotenv"
)

type apiConfig struct {
	db             *database.Queries
	fileserverHits atomic.Int32
}

func main() {
	const filepathRoot = "."

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Couldn't find '.env' file: %v", err)
	}
	port := os.Getenv("PORT")
	dbUrl := os.Getenv("DB_URL")

	dbConn, err := sql.Open("postgres", dbUrl)
	if err != nil {
		log.Fatalf("Error opening database: %s", err)
	}

	dbQueries := database.New(dbConn)

	apiCfg := apiConfig{
		db:             dbQueries,
		fileserverHits: atomic.Int32{},
	}

	mux := http.NewServeMux()
	mux.Handle("/app/", apiCfg.middlewareMetricsInc(http.StripPrefix("/app", http.FileServer(http.Dir(filepathRoot)))))
	mux.HandleFunc("GET /api/healthz", handlerReadiness)
	mux.HandleFunc("GET /admin/metrics", apiCfg.handlerMetrics)
	mux.HandleFunc("GET /app/other", apiCfg.handlerSecondPage)
	mux.HandleFunc("POST /admin/reset", apiCfg.handlerReset)
	mux.HandleFunc("GET /api/user", apiCfg.handlerCreateUser)

	srv := &http.Server{
		Addr:              ":" + port,
		ReadHeaderTimeout: time.Second * 10,
		Handler:           mux,
	}

	log.Printf("Serving files from %s on port: %s\n", filepathRoot, port)
	log.Fatal(srv.ListenAndServe())
}

func (cfg *apiConfig) handlerSecondPage(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	_, err := w.Write([]byte(fmt.Sprintf(`
	<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Other FIT Merch Shop</title>
	</head>
	<body>
    	<h1>This is the other page for our shop</h1>
		<p>%s</p>
	</body>

	</html>
		`, "Lol")))
	if err != nil {
		log.Fatalf("error writing secondary page to http address: %v", err)
	}
}
