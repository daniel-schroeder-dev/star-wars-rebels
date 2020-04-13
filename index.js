const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Rebels up at:', PORT);
});
