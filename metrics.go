package main

import (
	"fmt"
	"log"
	"net/http"
)

func (cfg *apiConfig) handlerMetrics(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	_, err := w.Write([]byte(fmt.Sprintf(`
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>FIT Shop Metrics</title>
</head>
<body>
	<h1>Welcome, FIT Admin</h1>
	<p>Our shop has been visited %d times!</p>
</body>

</html>
	`, cfg.fileserverHits.Load())))
	if err != nil {
		log.Fatalf("error writing admin page to http address: %v", err)
	}
}

func (cfg *apiConfig) middlewareMetricsInc(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cfg.fileserverHits.Add(1)
		next.ServeHTTP(w, r)
	})
}
