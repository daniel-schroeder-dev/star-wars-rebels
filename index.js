const express = require('express');
const morgan = require('morgan');
const rebelDetails = require('./fixtures/rebel-details');

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/rebel-details', (req, res, next) => {
  res.json(rebelDetails);
});

app.get('/', (req, res, next) => {
  res.redirect(301, '/skywalker');
});

app.get('*', (req, res, next) => {
  const rebelName = req.url.split('/')[1];
  const rebel = rebelDetails[rebelName];
  res.render('index', { rebel });
});

app.listen(PORT, () => {
  console.log('Rebels up at:', PORT);
});
