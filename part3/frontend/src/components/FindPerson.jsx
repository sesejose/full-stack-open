const FindPerson = (props) => {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input onChange={props.findPerson} />
        {props.personFound ? (
          <div>
            {props.personFound.name} {props.personFound.number}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
export default FindPerson;
