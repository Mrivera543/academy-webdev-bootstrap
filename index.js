var express = require('express');
var basicAuth = require('basic-auth');
var app = express();

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'project' && user.pass === 'project') {
    return next();
  } else {
    return unauthorized(res);
  };
};


app.set('port', (process.env.PORT || 5000));
app.use(auth);
app.use(express.static(__dirname + '/build'));

app.listen(app.get('port'), function() {
  console.log("Static express server is now running at localhost:" + app.get('port'))
})
