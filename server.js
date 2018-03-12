const express = require('express');
const app = express();
const someData = require('./data/data.json');

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};
const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);
app.use(express.static('public'));
app.use(express.static('sunsets'));

app.get('/', (request, response) => {
  // We don't need to explicitly use this handler or send a response
  // because Express is using the default path of the static assets
  // to serve this content
});

app.get('/json', (request, response) => {
  response.status(200).json(someData);
});

app.get('/sunsets', (request, response) => {
  // response.status(201).sendFile(express.static('sunsets'));
  response.status(201).sendFile(__dirname + '/public/sunsets.html');
});

app.listen(3000, () => {
  console.log('Express Intro running on localhost:3000');
});