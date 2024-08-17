import { useEffect, useState } from 'react';
import _ from 'lodash';
import PersonsService from './services/persons';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    PersonsService.getAll().then((personsList) => setPersons(personsList));
  }, []);

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
      PersonsService.create(newPerson).then((addedPerson) => {
        setPersons((prevPersons) => [...prevPersons, addedPerson]);
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson((prevNewPerson) => ({
      ...prevNewPerson,
      [name]: value,
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
