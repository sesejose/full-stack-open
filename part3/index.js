require('dotenv').config() // Always at the very top
const express = require('express')
const Person = require('./models/person') // Import the Person model
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('frontend/dist')) // Add this line to serve static files

app.use(cors())

// json-parser should be here, before the route definitions (app.get, app.post, etc))
// Without the json-parser, the body property would be undefined.
// The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json())

// app.use(morgan("tiny"));

// Custom Morgan token for body
morgan.token('body', (req) => JSON.stringify(req.body))

// Log requests including the POST body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// In-memory data storage

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// Next, we define the routes to the application.
// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// Getting all persons
// app.get("/api/persons", (request, response) => {
//   Person.find({}).then((persons) => {
//     response.json(persons);
//   });
// });
// ********* Using Mongoose methods *********
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

// Getting person by id
// app.get("/api/persons/:id", (request, response) => {
//   const id = request.params.id;
//   const person = persons.find((person) => person.id === id);
//   //The status returned previously was 200 OK and that was because person was undefined. Now, if a person with the given id is not found, we return a 404 Not Found status.
//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });
//********* Using Mongoose methods *********
// Using Mongoose's findById method, fetching an individual person gets changed into the following:
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end() // if a person with the given id doesn't exist, the server will respond to the request with the HTTP status code 404 not found.
      }
    })
    // .catch((error) => {
    //   // simple catch block to handle cases where the promise returned by the findById method is rejected:
    //   console.log(error); // When dealing with Promises, it's almost always a good idea to add error and exception handling. Otherwise, you will find yourself dealing with strange bugs.
    //   response.status(400).send({ error: "malformatted id" }); // The appropriate status code for the situation is 400 Bad Request (and NOT 500) because the situation fits the description perfectly:
    //   // I've just comment it because I will handle errors in a dedicated middleware later
    // });
    .catch((error) => next(error))
})

// ******** Deleting a person by id *******
// app.delete("/api/persons/:id", (request, response) => {
//   const id = request.params.id;
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
//   //If deleting the resource is successful, meaning that the person exists and is removed, we respond to the request with the status code 204 no content and return no data with the response.
// });

// ********* Update with Express method *********
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// ********* Creating a new person *********
// I needed to Extract name and number from request.body ( Postman )
// Working local and hard-coded newPerson didn't worked
// POST route never used req.body, I was ignoring the body and using hard-coded newName and newNumber
// Continued with that aproach will required rewrite the token
// morgan.token("body", (req, res) => JSON.stringify(res.locals.newPerson));
// and response.locals.newPerson = newPerson;

// ******** Commented to better define body *********
// app.post("/api/persons", (request, response) => {
//   const newId = (Math.random() * 10000).toFixed(0);
//   const { name, number } = request.body;

//   if (!body.content) {
//     return response.status(400).json({ error: "content missing" });
//   }

//   if (!name || !number) {
//     return response.status(400).json({ error: "The name or number is missing" });
//   }

//   if (persons.find((person) => person.name === name)) {
//     return response.status(400).json({ error: "name must be unique" });
//   }

//   // const newPerson = { id: newId, name, number };
//   // persons = persons.concat(newPerson);
//   // response.json(newPerson);

//   const person = new Person({
//     //   id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   });
//   person.save().then((savedPerson) => {
//     response.json(savedPerson);
//   });
// });

//*********  I've destructured name and number but then tried to use body.content (which doesn't exist). */
app.post('/api/persons', (request, response, next) => {
  const body = request.body // Define body first

  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: "name or number missing" });
  // }

  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }

  // Create a new Person instance (Model for the Schema)
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    // .catch((error) => response.status(500).json({ error: error.message }));
    .catch((error) => next(error))
})

// Testing with Postman,
// When it sends: POST http://localhost:3001/api/persons
// Express looks at your code and finds a matching route: app.post('/api/persons', (req, res) => { this code runs...})
// So it’s NOT Postman choosing the function. It’s Express matching the request’s METHOD + PATH.

// I define the /info route and variables for the data I need to display
// I can use express routing in info.js file as well - but let's keep it simple for now

// app.get("/info", (request, response) => {
//   const amount = persons.length;
//   const time = new Date();
//   response.send(
//     `<p>Phonebook has info for ${amount} people</p>
//      <p>${time}</p>`
//   );
// });

// ********* Using Mongoose methods *********
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const time = new Date()
      response.send(
        `<p>Phonebook has info for ${count} people</p>
         <p>${time}</p>`
      )
    })
    .catch((error) => next(error))
})

// ********* Find a person with Mongoose method findByIdAndUpdate *********
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  // This is the updated person data sent by the client in the request body
  const person = {
    name: body.name,
    number: body.number,
  }
  // { new: true }, que hará que nuestro controlador de eventos sea llamado con el nuevo documento modificado en lugar del original.

  // Mongoose validators are turned OFF by default when using findByIdAndUpdate (and other update methods)!
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

// ********* Middleware for handling errors *********
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

// PORT definition and server start
// const PORT = 3001;
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
