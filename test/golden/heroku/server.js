var Express = require('express');
var App = Express();
var BodyParser = require('body-parser');

App.set('views', __dirname);
App.set('view engine', 'ejs');

var Kaltura = require('./lucy/kaltura-custom-api.js');

App.set('port', (process.env.PORT || 3000));
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
  extended: true
}));

App.get('/', function(req, res, next) {
  console.log('star');
  if (!Kaltura.initialized()) {
    console.log('redir');
    res.redirect('/secrets.html');
  } else {
    next();
  }
});

App.post('/setSecrets', function(req, res) {
  if (!Kaltura.initialized()) {
    Kaltura.initialize(req.body, function() {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

App.get('/', function(req, res) {
  res.redirect('/newest-media.html');
});


App.post('/newestMedia', function(req, res) {
  console.log('request' + JSON.stringify(req.body));
  Kaltura.newestMedia(req.body.nameLike, function(err, result) {
    if (err) {
      console.log('Error:' + JSON.stringify(err));
      res.statusCode(401);
      return res.end();
    }
    console.log('got data, returning:' + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
})

App.use(Express.static(__dirname + '/static'));

App.listen(App.get('port'), function() {
  console.log("Node App is running at localhost:" + App.get('port'));
});
