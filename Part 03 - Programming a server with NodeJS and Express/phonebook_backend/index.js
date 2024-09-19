import express from 'express';

import getRandomInt from './utils/getRandomInt.js';

const app = express();
const port = process.env.port || 3001;
const maxId = 100000;

app.use(express.json());

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (req, res) => {
  const date = new Date();
  const message = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  res.send(message);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name) return res.status(400).json({ error: 'name is missing' });
  if (!number) return res.status(400).json({ error: 'number is missing' });

  const nameExists = persons.some((person) => person.name === name);
  if (nameExists)
    return res
      .status(400)
      .json({ error: 'name already exists in the phonebook' });

  const id = getRandomInt(maxId);
  const newPerson = { id, name, number };

  persons.push(newPerson);

  res.status(201).json(newPerson);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});