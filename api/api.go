package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/intrntsrfr/jarvis"
)

func main() {

	net := jarvis.NewNetwork(784, 512, 10, 0.01)

	router := gin.Default()

	api := router.Group("/api")

	api.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	})

	api.GET("/guess", func(c *gin.Context) {

		var lol []float64
		if err := c.ShouldBindJSON(&lol); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if len(lol) != 784 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "array must have a length of 784"})
			return
		}

		x := jarvis.Matrix{}

		for _, item := range lol {
			x = append(x, []float64{item})
		}

		guess := net.Guess(x)

		fmt.Println(guess)
		c.JSON(http.StatusOK, gin.H{"guess": guess})
	})

	router.Run(":8080")
}
