// handle unknown endpoint
const unknownEndpointHandler = (request, response) => {
	response.status(404).json({error: "Unknown Endpoint"})
}

// handle errors
const errorHandler = (error, request, response, next) => {
	next(error)
}

module.exports = {
  unknownEndpointHandler,
  errorHandler
}