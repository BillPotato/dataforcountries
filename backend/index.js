require("dotenv").config()
const express = require("express")
const { unknownEndpointHandler, errorHandler } = require("./middleware/errorHandlers")
const morgan = require("./middleware/morgan")

const app = express()

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

// _______________________________________




// _______________________________________

// handle unknown endpoint
app.use(unknownEndpointHandler)

// handle errors
app.use(errorHandler)

// _______________________________________

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Phonebook backend running on port ${PORT}`)
})