import express from 'express';
import cors from 'cors';
import { generateId } from './id-generator.js';
import { readFromJsonUserFile, writeToJsonUserFile } from './file-io.js';
import { getDateAndTime } from './date-generator.js';
import bodyParser from 'body-parser';
//_________________________________________________
const app = express();
const idGen = generateId(0);

//Middlewares:
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//_______________________

//Port_________
app.listen(7000, () => {
  console.log('Server running on http://localhost:7000');
});
//ROUTES____________________________________________
//___POST ROUTE CREATE BANK ACC
app.post('/saskaita/sukurti', (req, res) => {
  const users = readFromJsonUserFile();
  const newUser = req.body;
  if (!newUser.name) return res.status(400).send('Wrong data');
  //_________
  newUser.id = idGen.next().value;
  newUser.balance = 0;
  newUser.transactions = [];
  //Add redirect later
  users.push(newUser);
  writeToJsonUserFile(users);
  res.status(201).json(newUser); // Laikinai Kol padarysiu redirect
});

//________ GET Get user by id / response with user data
app.get('/saskaita/:id', (req, res) => {
  const users = readFromJsonUserFile();
  const id = Number(req.params.id);
  const user = users.find((usr) => usr.id === id);
  if (!user) return res.status(404).send('User Not Found');
  res.status(200).json(user);
});

// _______ POST Deposit on user acc by his id SUGRIZTI APTVARKYT
app.post('/saskaita/:id/imoka', (req, res) => {
  const date = getDateAndTime();
  const users = readFromJsonUserFile();
  const id = Number(req.params.id);
  const deposit = Number(req.body.amount);

  const user = users.find((usr) => usr.id === id);
  if (!user) return res.status(404).send('User Not Found aaaaa');
  if (deposit <= 0 || isNaN(deposit))
    return res.status(404).send('User Not Found bbbbbb');

  user.balance = user.balance + deposit;
  user.transactions.push({
    type: 'Deposit',
    amount: `${deposit}€`,
    date: date,
  });
  writeToJsonUserFile(users);
  res.status(200).json(user);
});

//__________POST Withdraw users balance
app.post('/saskaita/:id/ismoka', (req, res) => {
  const date = getDateAndTime();
  const users = readFromJsonUserFile();
  const id = Number(req.params.id);
  const withdrawal = Number(req.body.amount);

  const user = users.find((usr) => usr.id === id);
  if (!user) return res.status(404).send('User Not Found');
  if (withdrawal <= 0 || withdrawal > user.balance || isNaN(withdrawal))
    return res.status(404).send('You cant withdrow, balance is not valid');

  user.balance = user.balance - withdrawal;
  user.transactions.push({
    type: 'Withdrawl',
    amount: `${withdrawal}€`,
    date: date,
  });
  writeToJsonUserFile(users);
  res.status(200).json(user);
});
// DELETE ___________ Delete user acc
app.delete('/saskaita/:id/delete', (req, res) => {
  const users = readFromJsonUserFile();
  const id = Number(req.params.id);
  const index = users.findIndex((usr) => usr.id === id);
  if (index === -1) return res.status(404).send('User not found');
  users.splice(index, 1);
  writeToJsonUserFile(users);
  res.status(204).send('Account has been deleted');
});
