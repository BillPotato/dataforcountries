require("dotenv").config()
const morgan = require("./middleware/morgan")
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const {
  getOrSet
} = require("./utils/redis")
const { 
  unknownEndpointHandler, 
  errorHandler 
} = require("./middleware/errorHandlers");

const app = express()

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

// _______________________________________


app.get("/api/countries", async (req, res) => {
  const countries = await getOrSet("countries", async () => {
    const { data } = await axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")

    return data
  })

  res.json(countries)
})

app.get("/api/weather", async (req, res) => {
  const { lon, lat } = req.query
  if (!lon || !lat) return res.json({ error: "missing lon/lat query parameters" })

  const weather = await getOrSet(`weather?lon=${lon}&lat=${lat}`, async () => {
    const { data } = await axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}& \
        units=metric&id=524901&appid=${OPENWEATHER_API_KEY}`)

    return data
  })

  res.json(weather)
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