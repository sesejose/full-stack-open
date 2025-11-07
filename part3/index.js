const express = require("express");
const app = express();

// json-parser should be here, before the route definitions!!!!!!!!
// Without the json-parser, the body property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json());

// In-memory data storage

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Next, we define the routes to the application.
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// Getting all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// Getting all persons
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  //The status returned previously was 200 OK and that was because person was undefined. Now, if a person with the given id is not found, we return a 404 Not Found status.
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// Deleting a person
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
  //If deleting the resource is successful, meaning that the note exists and is removed, we respond to the request with the status code 204 no content and return no data with the response.
});

// i define the /info route and variables for the data I need to display
// I can use express routing in info.js file as well - but let's keep it simple for now
app.get("/info", (request, response) => {
  const amount = persons.length;
  const time = new Date();
  response.send(
    `<p>Phonebook has info for ${amount} people</p>
     <p>${time}</p>`
  );
});

// PORT definition and server start
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
