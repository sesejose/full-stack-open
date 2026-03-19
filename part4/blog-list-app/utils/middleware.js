const logger = require("./logger");
// middleware.js imports the logger module and defines three middleware functions: requestLogger, unknownEndpoint, and errorHandler. These functions are used to log incoming requests, handle unknown endpoints, and manage errors in the application, respectively. The middleware functions are exported for use in other parts of the application, such as app.js, where they are applied to the Express app to enhance its functionality and robustness.

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
