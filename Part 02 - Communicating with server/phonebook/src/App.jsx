import { useState } from 'react';
import _ from 'lodash';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });

  const isNameInPersons = (newPerson) => {
    return persons.some((person) => _.isEqual(person, newPerson));
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (isNameInPersons(newPerson)) {
      alert(
        `${newPerson.name} (${newPerson.number}) is already added to phonebook`
      );
    } else {
      setPersons((prevPersons) => [...prevPersons, newPerson]);
    }
  };

  const handleNewNameChange = (event) => {
    setNewPerson((prevPerson) => ({ ...prevPerson, name: event.target.value }));
  };

  const handleNewNumberChange = (event) => {
    setNewPerson((prevPerson) => ({
      ...prevPerson,
      number: event.target.value,
    }));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type='submit' onClick={addNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
