// utils/config.js
// This module handles configuration settings for the application.
// It loads environment variables from a .env file and exports them for use in other parts of the app.
// This helps keep configuration centralized and makes it easier to manage different environments (development, production, etc.).
// It is important to load the environment variables at the very beginning to ensure they are available when needed.

// The other parts of the application can access the environment variables by importing the configuration module:

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = { MONGODB_URI, PORT };
