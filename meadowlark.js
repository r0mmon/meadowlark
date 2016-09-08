var express = require('express');
var app = express();
var fortune = require('./lib/fortune');

// Установка механизма представления handlebars
var handlebars = require('express-handlebars')
    .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about', {fortune: fortune.getFortune()});
});

// Пользовательская страница 404
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// пользовательская страница 500
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('505');
});

app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' +
      app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
