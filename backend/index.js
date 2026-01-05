const morgan = require("./middleware/morgan")
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const {
  redisClient,
  getOrSet
} = require("./utils/redis")
const { 
  unknownEndpointHandler, 
  errorHandler 
} = require("./middleware/errorHandlers");

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

// _______________________________________


app.get("/countries", async (req, res) => {
  const countries = await getOrSet("countries", async () => {
    const { data } = await axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")

    return data
  })

  res.json(countries)
})


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