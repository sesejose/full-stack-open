import { useState, useEffect } from "react";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";
import FindPerson from "./components/FindPerson";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456", id: 1 },
    // { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newNumber, setNewNumber] = useState([{ number: "040-123456" }]);
  const [newName, setNewName] = useState("");
  const [personFound, setPersonFound] = useState();

  // fetching data from server with axios and useEffect
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      // console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  console.log(persons);

  const handleInputName = (event) => {
    const found = persons.find((element) => element.name === event.target.value);
    if (!persons.includes(found)) {
      setNewName(event.target.value);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleInputPhone = (event) => {
    const found = persons.find((element) => element.number === event.target.value);
    if (!persons.includes(found)) {
      setNewNumber(event.target.value);
    } else {
      alert(`${newNumber} is already added to phonebook`);
    }
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: 1 + persons.length,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber(""); // to clear the input field after submission!
    // Add new person to server / db.json using
    axios
      .post("http://localhost:3001/persons", personObject)
      .then((response) => {
        console.log("Data posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  const findPerson = (event) => {
    //Split fullname in Array of strings
    const target = event.target.value;
    const spaces = target.split(" "); // from 0 - from the begining to the first white space.
    const firstName = spaces[0].charAt(0).toUpperCase() + spaces[0].slice(1); // Capitalize first letter
    const lastName = spaces[1].charAt(0).toUpperCase() + spaces[1].slice(1); // Capitalize first letter
    const fullName = firstName + " " + lastName;
    console.log(spaces);
    const found = persons.find((element) => element.name === firstName || element.name === fullName);
    if (persons.includes(found)) {
      console.log(found);
      setPersonFound(found);
    } else {
      // alert(`We can not find ${event.target.value} in the phonebook`);
    }
  };

  return (
    <div>
      <FindPerson findPerson={findPerson} personFound={personFound} />

      <AddPerson addNewPerson={addNewPerson} handleInputName={handleInputName} handleInputPhone={handleInputPhone} />

      <Persons persons={persons} />
    </div>
  );
};

export default App;
