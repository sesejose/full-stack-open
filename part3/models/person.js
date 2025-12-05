const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

// Connect is the method that open s the connection between your Node.js and MongoDB database.
// The family: 4 option forces the use of IPv4, which can help avoid certain network issues.
// With Node.js I can pass more values as parameters with the command line
mongoose
  .connect(url, { family: 4 })

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// After establishing the connection, define the schema and model
// First we define the schema for a person that is stored in the personSchema variable.
// The schema tells Mongoose how the person objects are to be stored in the database.

const personSchema = new mongoose.Schema({
  //   id: String,
  name: String,
  number: String,
});
// In the Person model definition, the first "Person" parameter is the singular name of the model.
const Person = mongoose.model("Person", personSchema);

// Transforming the returned object when toJSON is called
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Exporting the Model to use in index.js
module.exports = mongoose.model("Person", personSchema);
