import { useState } from 'react';
import _ from 'lodash';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: '' });

  const addNewPerson = (event) => {
    event.preventDefault();

    const personExists = persons.some((person) =>
      _.isEqual(_.omit(person, ['id']), _.omit(newPerson, ['id']))
    );
    if (personExists) {
      alert(
        `${newPerson.name} (${newPerson.number}) is already added to phonebook`
      );
    } else {
      setPersons((prevPersons) => [...prevPersons, newPerson]);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson((prevNewPerson) => ({
      ...prevNewPerson,
      [name]: value,
      id: persons.length + 1,
    }));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input name='name' onChange={handleInputChange} />
        </div>
        <div>
          number: <input name='number' onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit' onClick={addNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
