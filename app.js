const express = require('express');
const app = express();

app.set('view engine', 'pug');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/static', express.static('public'));

const mainRoutes = require('./routes');
app.use(mainRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
