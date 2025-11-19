import axios from "axios";
const url = "https://phonebook-backend-wm39.onrender.com/api/persons";

// The function has an argument newPerson representing the new person to be added
// It is newPeron because in App.jsx we call addPerson(personObject)
// This is, it could be named something else, whatever, it's just to indicate the placeholder for the data to be sent
const addPerson = (newPerson) => {
  return axios.post(url, newPerson);
};

const replaceNumber = (id, newNumber) => {
  return axios.put(`${url}/${id}`, newNumber);
};

const getAllPersons = () => {
  return axios.get(url);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default { addPerson, getAllPersons, deletePerson, replaceNumber };
