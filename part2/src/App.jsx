import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleInput = (event) => {
    const found = persons.find((element) => element.name === event.target.value);
    if (!persons.includes(found)) {
      setNewName(event.target.value);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const addNewName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
    // to clear the input field after submission!
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <div>
          {persons.map((i, name) => (
            <div key={name}>{i.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
