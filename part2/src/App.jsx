import { useState, useEffect } from "react";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";
import FindPerson from "./components/FindPerson";
// import axios from "axios";
import personsServices from "./services/persons";
import Notification from "./components/Notifications";
import Countries from "./Countries";
import countriesServices from "./services/countries";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456", id: 1 },
    // { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([{ number: "040-123456" }]);
  const [personFound, setPersonFound] = useState();
  const [personToUpdate, setPersonToUpdate] = useState(null);
  const [successMessage, setSuccessMessage] = useState("success...");
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error...");
  const [showError, setShowError] = useState(false);

  // fetching data from server with axios and useEffect
  // useEffect(() => {
  //   axios.get("http://localhost:3001/persons").then((response) => {
  //     // console.log(response.data);
  //     setPersons(response.data);
  //   });
  // }, []);

  // Fetching data from server with axios and useEffect using service persons.js in the MODULE
  useEffect(() => {
    personsServices.getAllPersons().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleInputName = (event) => {
    const inputValue = event.target.value;
    setNewName(inputValue);
    const found = persons.find((element) => element.name === event.target.value);
    // if (found) {
    //   setIdToDelete(found.id);
    //   console.log(idToReplace);
    // }
    // const fName = found ? found.name : null;
    // const fId = found ? found.id : null;
    // const fNumber = found ? found.number : null;
    // console.log(found[3]);
    if (found) {
      setPersonToUpdate(found);
    } else {
      // alert(`${newName} is already added to phonebook`);
      setPersonToUpdate(null); // Clear if not found
    }
  };

  const handleInputPhone = (event) => {
    setNewNumber(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    // Add new person to server / db.json using
    // axios
    //   .post("http://localhost:3001/persons", personObject)
    //   .then((response) => {
    //     console.log("Data posted successfully:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error posting data:", error);
    //   });

    //PUT request in persons
    // Using the values I already have! newName, defined in handleInputName
    const matching = persons.find((element) => element.name === newName);
    // If true
    if (matching) {
      // Update existing
      // With this I don't need to check if it is null or not, the state is already rendered so I can use its properties
      const updatedPerson = {
        ...matching,
        number: newNumber,
        id: matching.id,
      };
      if (window.confirm(`${updatedPerson.name} already has a phone number. Would you like to replace it?`)) {
        personsServices
          .replaceNumber(personToUpdate.id, updatedPerson)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error updating data:", error);

            setTimeout(() => {
              setShowError(true);
              setErrorMessage(`${personToUpdate.name}` + " has already been removed from the list.");
            }, 1000);
          });
      }
    } else {
      // alert("Allright, let's keep the old one.");
      // Using the service instead of axios directly as above
      // personsService is the prefix, as Context, just to add the module, the the function in the module
      // Adding the newPeron
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(1 + persons.length),
      };
      personsServices
        .addPerson(newPerson)
        .then((response) => {
          console.log("Data posted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  // if (personObject.name === newName) {
  //   // Replacing the number if that person already has one
  //   if (window.confirm(`${personObject.name} already has a number. Would you like to replace it?`)) {
  //     personsServices.replaceNumber(identity, newNumber).then((response) => {
  //       console.log(response.data);
  //     });
  //   } else {
  //     // alert("Allright, let's keep the old one.");
  //     // Using the service instead of axios directly as above
  //     // personsService is the prefix, as Context, just to add the module, the the function in the module
  //     personsServices
  //       .addPerson(personObject)
  //       .then((response) => {
  //         console.log("Data posted successfully:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error posting data:", error);
  //       });
  //   }
  // }
  // };

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

  const deletePerson = (id, name) => {
    // The id comes with the button event handler
    // App uses the function with axios defined in the service MODULE !!!
    // I access that function with personService imported !
    if (window.confirm("Are you sure you want to delete " + `${name}`)) {
      personsServices.deletePerson(id).then((response) => {
        console.log(response.data);
        setTimeout(() => {
          setShowNotification(true);
          setSuccessMessage(`${name}` + " was successfully removed from the list.");
        }, 2000);
        setPersons(persons.filter((n) => n.id !== id));
        // It keeps only notes whose n.id is different from id, so it effectively removes the note(s) whose id equals the id variable (parameter defined with the map).
      });
    } else {
      alert("Allright, let's keeping it.");
    }
  };

  // ---------------    Show / Find Countries    -----------------------

  // const all = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [countries, setCountries] = useState([]);
  const [countryFound, setCountryFound] = useState();
  const [countryName, setCountryName] = useState("");
  const [matchingElements, setMatchingElements] = useState([]);

  // Get All countries

  useEffect(() => {
    countriesServices.getAllCountries().then((response) => {
      setCountries(response.data);
    });
  }, []);

  // Find country and define props and states to pass to Countries.jsx

  const findCountry = (event) => {
    const target = event.target.value;
    const firstLetter = target.charAt(0).toUpperCase();
    const restOfWord = target.slice(1);
    const targetFormatted = firstLetter + restOfWord;
    setCountryName(targetFormatted);
    const found = countries.find((element) => element.name.common === targetFormatted);
    //   console.log("Target", target, "Found", found);
    if (countries.includes(found)) {
      countriesServices.showFoundCountry(targetFormatted).then((response) => {
        setCountryFound(response.data);
        // Here the data is the object of the array countries fetched from the API url name
      });
    } else {
      console.log("No country found");
    }

    // Input onChange also set the matchingTarget state, if target / input is not empty
    // filter those countries whose name includes the target string
    // If the target is empty, clear the countryFound state
    // Whatever it is, I pass the matchingTarget state to Countries.jsx as prop to show the list
    if (target) {
      setMatchingElements(countries.filter((element) => element.name.common.includes(target)));
      console.log("matching works");
    } else {
      setMatchingElements([]);
    }
  };

  return (
    <div>
      <Countries countries={countries} findCountry={findCountry} countryFound={countryFound} countryName={countryName} matchingElements={matchingElements} />

      {showNotification ? <Notification success={successMessage} /> : null}
      {showError ? <Notification error={errorMessage} /> : null}

      <FindPerson findPerson={findPerson} personFound={personFound} />

      <AddPerson addNewPerson={addNewPerson} handleInputName={handleInputName} handleInputPhone={handleInputPhone} />

      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
