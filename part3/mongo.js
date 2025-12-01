const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://sesejose_fullstackopen_course:${password}@cluster0.g3zdi3z.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);

// Connect is the method that open s the connection between your Node.js and MongoDB database.
// The family: 4 option forces the use of IPv4, which can help avoid certain network issues.
// With Node.js I can pass more values as parameters with the command line
mongoose.connect(url, { family: 4 });

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

const person = new Person({
  //   id: "4",
  name: "Mary Poppendieck",
  number: "39-23-6423122",
});

person.save().then((result) => {
  //   console.log("added Mary Poppendieck number 39-23-6423122 to phonebook");
  //   mongoose.connection.close();
});

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person.name, person.number);
  });
  mongoose.connection.close();
});
