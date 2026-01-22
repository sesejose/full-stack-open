// utils/logger.js
// This module provides simple logging functionality for the application.
// It defines two methods: info for general informational messages and error for logging error messages.
// This helps in tracking the application's behavior and diagnosing issues.

const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = { info, error };
