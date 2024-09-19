import express from 'express';

const app = express();
const port = process.env.port || 3000;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
