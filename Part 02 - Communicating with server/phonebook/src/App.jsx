import { useEffect, useState } from 'react';
import PersonsService from './services/persons';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    PersonsService.getAll()
      .then((personsList) => setPersons(personsList))
      .catch((error) => console.log(`Couldn't get the phonebook data`, error));
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(
      (person) => person.name === newPerson.name
    );

    if (personExists) {
      const updateConfirmation = confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (updateConfirmation) {
        PersonsService.update(personExists.id, newPerson).then(
          (updatedPerson) => {
            const updatedPersonsList = persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersonsList);
          }
        );
      }
    } else {
      PersonsService.create(newPerson)
        .then((addedPerson) => {
          setPersons((prevPersons) => [...prevPersons, addedPerson]);
        })
        .catch((error) => console.log('Error creating new entry', error));
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

  const deletePerson = (id) => {
    PersonsService.remove(id)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
      })
      .catch((error) => console.log('Error removing an entry', error));
  };

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
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
