/* tEM HAS 2 CHEKS dIS!! oooIIII! https://www.npmjs.com/package/jade-bootstrap */
/* ni idea de como va toda esta movida tronco */

/* NODE_MODULES */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* ENRUTAMENT */
var routes = require('./routes/index');

/* D'AQUI AL FINAL, COSES QUE EN PRINCIPI NO S'HAURIEN DE TOCAR
(desiste tronco pq solo te lo cargaras todo xD) */
var app = express();

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/chat/static', express.static(path.join(__dirname, '/public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { locals: { scripts: ['ajax.js', 'messages.js'] } });
app.set('view engine', 'jade');

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      goblins: 'ATENCIÓN: unos goblins traviesos nos han robado el cobre :C',
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    goblins: 'ATENCIÓN: unos goblins traviesos nos han robado el cobre :C',
    message: err.message,
    error: {}
  });
});

module.exports = app;
