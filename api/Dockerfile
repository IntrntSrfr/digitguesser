FROM golang:alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o api

EXPOSE 8080:8080

CMD ["/app/api"]