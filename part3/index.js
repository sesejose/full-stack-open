const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
app.use(express.static("dist")); // Add this line to serve static files

app.use(cors());

// json-parser should be here, before the route definitions!!!!!!!!
// Without the json-parser, the body property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json());

// app.use(morgan("tiny"));

// Custom Morgan token for body
morgan.token("body", (req) => JSON.stringify(req.body));

// Log requests including the POST body
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

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

// Getting person by id
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

// Deleting a person by id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
  //If deleting the resource is successful, meaning that the note exists and is removed, we respond to the request with the status code 204 no content and return no data with the response.
});

// Creating a new person
// I needed to Extract name and number from request.body ( Postman )
// Working local and hard-coded newPerson didn't worked
// POST route never used req.body, I was ignoring the body and using hard-coded newName and newNumber
// Continued with that aproach will required rewrite the token
// morgan.token("body", (req, res) => JSON.stringify(res.locals.newPerson));
// and response.locals.newPerson = newPerson;
app.post("/api/persons", (request, response) => {
  const newId = (Math.random() * 10000).toFixed(0);
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: "The name or number is missing" });
  }

  if (persons.find((person) => person.name === name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = { id: newId, name, number };
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

// Testing with Postman,
// When it sends: POST http://localhost:3001/api/persons
// Express looks at your code and finds a matching route: app.post('/api/persons', (req, res) => { this code runs...})
// So it’s NOT Postman choosing the function. It’s Express matching the request’s METHOD + PATH.

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
