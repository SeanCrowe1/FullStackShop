# FullStackShop
A full stack webapp using JS, HTML &amp; CSS with node.js and SQLite for the backend.

## Installation

Make sure you have the latest [Go toolchain](https://golang.org/dl/) installed. You can then install `FullStackShop` with:

```bash
go install "github.com/OisinSD/FullStackShop@latest"
```

## Config

Create a `.env` file in your project directory with the following structure:

```yaml
PORT=8080
DB_URL:libsql://fullstackshop-db-seancrowe1.aws-eu-west-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicm8iLCJpYXQiOjE3Njg5MDcxODMsImlkIjoiMjgyODA1OGUtNDE1Yi00OTVmLTk4NGEtMzY3YWNhY2IwN2RmIiwicmlkIjoiMWQzZDJhNzYtMjUxYi00ZGFlLTlkOTAtZTUxYzQ3ZTIwMjFhIn0.HCkEHWfZbZey0AhgPxw9gl_Go739NKHNTZ0lcl0p8iHsXPu_2gG21Zl803zELpYkpm9BARBQOFDurWz423MxAw
```

## Usage

From the root of your directory, run:

```bash
go run .
```

This should print the following message in your terminal:

```bash
<date> <time> Serving files from . on port: 8080
```

Go to http://localhost:8080/app/ or open [this link](http://localhost:8080/app/) in your internet browser of choice

You should now see the home page of our shop!