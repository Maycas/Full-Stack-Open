import { useState } from 'react';
import _ from 'lodash';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });

  const addNewPerson = (event) => {
    event.preventDefault();

    const personExists = persons.some((person) => _.isEqual(person, newPerson));
    if (personExists) {
      alert(
        `${newPerson.name} (${newPerson.number}) is already added to phonebook`
      );
    } else {
      setPersons((prevPersons) => [...prevPersons, newPerson]);
    }
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input name="name" onChange={handleInputChange} />
        </div>
        <div>
          number: <input name="number" onChange={handleInputChange} />
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
