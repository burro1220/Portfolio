const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/static', express.static('public'));

const mainRoutes = require('./routes');
app.use(mainRoutes);

//credit https://gist.github.com/zcaceres/2854ef613751563a3b506fabce4501fd for error handling

app.get('*', function(req, res, next) {
    let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
    err.statusCode = 404;
    err.shouldRedirect = true; //New property on err so that our middleware will redirect
    next(err);
  });

  app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err
  
    if (err.shouldRedirect) {
      res.render('error', {
        message: err.message,
        error: err,
        status: err.statusCode
      }) // Renders a myErrorPage.html for the user
    } else {
      res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
    }
  });

  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 8000;
  }
  app.listen(port);