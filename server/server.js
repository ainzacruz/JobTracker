const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files in our client/assets folder
app.use(express.static('client'));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;