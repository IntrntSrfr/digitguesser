package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/intrntsrfr/jarvis"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {

	net := jarvis.NewNetwork(784, 512, 10, 0.01)

	router := gin.Default()

	router.Use(CORSMiddleware())

	api := router.Group("/api")

	api.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	})

	api.POST("/guess", func(c *gin.Context) {

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

		c.JSON(http.StatusOK, guess)
	})

	router.Run(":8080")
}
