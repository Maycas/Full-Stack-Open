import { useState } from 'react';
import _ from 'lodash';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const isNameInPersons = (newPerson) => {
    return persons.some((person) => _.isEqual(person, newPerson));
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    if (isNameInPersons(newPerson)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons((prevPersons) => [...prevPersons, newPerson]);
    }
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNewNameChange} />
        </div>
        <div>
          <button type='submit' onClick={addNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
