const express = require("express"); // import express framework
const mongoose = require("mongoose"); // mongoose for MongoDB interactions
const config = require("./utils/config"); // import configuration settings
const logger = require("./utils/logger"); // import logger for logging info and errors
const middleware = require("./utils/middleware"); // import custom middleware
const blogsRouter = require("./controllers/blog"); // import blogs router

// create an express application
const app = express();

// log when connecting to database
logger.info("connecting to", config.MONGODB_URI);

const mongoUrl = config.MONGODB_URI;

// connect to MongoDB database
mongoose
  .connect(mongoUrl, { family: 4 })
  // log upon successful connection or error
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

// Serve static files from the "dist" directory
app.use(express.static("dist")); // Add this line to serve static files

// middleware to parse JSON bodies
app.use(express.json());

app.use(middleware.requestLogger);

// mount, use the blogs router for handling requests to /api/blogs
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app; // export the express application
