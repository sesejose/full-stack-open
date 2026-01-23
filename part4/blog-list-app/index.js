/* eslint-env node */
const app = require("./app"); // import the express application

const config = require("./utils/config"); // import configuration settings

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  // start the server
  console.log(`Server running on port ${PORT}`);
});
