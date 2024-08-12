import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();
    setPersons([...persons, { name: newName }]);
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
