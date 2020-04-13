const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/rebel-details', (req, res, next) => {
  res.json(require('./fixtures/rebel-details'));
});

app.get('*', (req, res, next) => {
  console.log(req.url);
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Rebels up at:', PORT);
});
