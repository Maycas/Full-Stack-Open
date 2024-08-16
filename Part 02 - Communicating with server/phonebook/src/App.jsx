import { useState } from 'react';
import _ from 'lodash';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: '' });
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onSearchChange={handleSearchChange} />
      <h2>Add New Entry</h2>
      <PersonsForm onInputChange={handleInputChange} onSubmit={addNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
