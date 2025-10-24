const Persons = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {props.persons.map((i, name) => (
          <div key={name}>
            <div>
              {i.name}
              {i.number}
              {/* The deletePerson(id) function in App uses the id  */}
              <button onClick={() => props.deletePerson(i.id)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Persons;

// The deletePerson(id) function in App uses the id
// It's passed with the Event handler function as a parameter
