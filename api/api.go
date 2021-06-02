package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/intrntsrfr/jarvis"
)

func main() {

	net := jarvis.NewNetwork(784, 512, 10, 0.01)

	router := chi.NewRouter()
	router.Get("/api/guess", func(w http.ResponseWriter, r *http.Request) {
		reqBody, _ := io.ReadAll(r.Body)
		lol := []float64{}
		json.Unmarshal(reqBody, &lol)
		if len(lol) != 784 {
			json.NewEncoder(w).Encode([]float64{})
			return
		}

		x := jarvis.Matrix{}

		for _, item := range lol {
			x = append(x, []float64{item})
		}

		guess := net.Guess(x)

		fmt.Println(guess)
	})

	http.ListenAndServe(":8080", router)
}
