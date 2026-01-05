const morgan = require("./middleware/morgan")
const express = require("express")
const axios = require("axios")
const { createClient } = require("redis");
const cors = require("cors")
const { 
  unknownEndpointHandler, 
  errorHandler 
} = require("./middleware/errorHandlers");

let redisClient;
(async () => {
  redisClient = createClient();

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  await redisClient.connect();
})();

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

// _______________________________________


app.get("/countries", async (req, res) => {
  const data = await redisClient.get("countries")
  if (data !== null) return res.json(JSON.parse(data))

  await axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(reqres => {
      redisClient.SET("countries", JSON.stringify(reqres.data))
      return res.json(reqres.data)
    })

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