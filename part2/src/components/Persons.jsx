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
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Persons;
