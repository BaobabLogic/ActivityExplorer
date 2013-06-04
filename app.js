
/**
 * Module dependencies.
 */

var hostname      = require('os').hostname();
var processNumber = process.env.INDEX_OF_PROCESS || 0;

require('nodefly').profile(
    'dc3b994068a9064f0319db0130f44fa0',
    ["Activity Explorer", hostname, processNumber],
);

var express = require('express'),
    http = require('http'),
    routes = require('./routes'),
    api = require('./routes/api');

var app = express();
var server = http.createServer(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.favicon(__dirname + '/public/img/favicon.ico')); 
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//API Refresher

api.refresh();

setInterval(function(param) {
  api.refresh();
}, 86400000);

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/api', api.api);
app.get('/api/service/:id/:date', api.specificService);
app.get('/api/available/:adults/:children/:date/:id', api.availabilityCheck);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

server.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);

  if (process.getuid() === 0)
    require('fs').stat(__filename, function(err, stats) {
      if (err) return console.log(err)
      process.setuid(stats.uid);
    });
});
