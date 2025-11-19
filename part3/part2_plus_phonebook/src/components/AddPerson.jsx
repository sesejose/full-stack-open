const AddPerson = (props) => {
  return (
    <>
      <h2>Add a new</h2>
      <div>
        <form onSubmit={props.addNewPerson}>
          <div>
            name: <input onChange={props.handleInputName} />
          </div>
          <div>
            number: <input onChange={props.handleInputPhone} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddPerson;
