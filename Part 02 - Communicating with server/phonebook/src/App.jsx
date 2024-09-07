import { useEffect, useState } from 'react';
import PersonsService from './services/persons';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';
import Notification from './components/Notification/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    PersonsService.getAll()
      .then((personsList) => setPersons(personsList))
      .catch(() => notify(`Couldn't get the phonebook data`, true));
  }, []);

  const notify = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const findPersonById = (id) => persons.find((person) => person.id === id);

  const findPersonByName = (name) =>
    persons.find((person) => person.name === name);

  const updatePersonsList = (updatedPerson) => {
    setPersons((prevPersons) =>
      prevPersons.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
  };

  const removeFromPersonsList = (personToRemove) => {
    setPersons((prevPersons) =>
      prevPersons.filter((person) => person.id !== personToRemove.id)
    );
  };

  const createPerson = (person) => {
    PersonsService.create(person)
      .then((addedPerson) => {
        setPersons((prevPersons) => [...prevPersons, addedPerson]);
        notify(`Added ${person.name}`, false);
      })
      .catch((error) => console.log('Error creating new entry', error));
  };

  const updatePerson = (existingPerson) => {
    const updateConfirmation = confirm(
      `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
    );

    if (updateConfirmation) {
      PersonsService.update(existingPerson.id, newPerson)
        .then((updatedPerson) => {
          updatePersonsList(updatedPerson);
          notify(`${existingPerson.name} phone number has been updated`, false);
        })
        .catch(() => {
          removeFromPersonsList(existingPerson);
          notify(
            `Information from ${existingPerson.name} has already been removed from the server`,
            true
          );
        });
    }
  };

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    const existingPerson = findPersonByName(newPerson.name);

    if (existingPerson) {
      updatePerson(existingPerson);
    } else {
      createPerson(newPerson);
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

  const handleDeletePerson = (id) => {
    const personToDelete = findPersonById(id);

    PersonsService.remove(id)
      .then(() => {
        removeFromPersonsList(personToDelete);
        notify(`${personToDelete.name} has been removed`, false);
      })
      .catch(() => {
        removeFromPersonsList(personToDelete);
        notify(
          `${personToDelete.name} was already removed from the server`,
          true
        );
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter onSearchChange={handleSearchChange} />
      <h2>Add New Entry</h2>
      <PersonsForm
        onInputChange={handleInputChange}
        onSubmit={handleAddNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
