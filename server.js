var express = require('express'),
   path = require('path'),
   fs = require('fs');
var compression = require('compression');
var app = express();
var staticRoot = __dirname + '/dist/admin/';
  // + express.static('dist/admin');
var env = process.env.NODE_ENV || '5001';

app.set('port', env);

app.use(compression());
/* other middleware */

/* place any backend routes you have here */

app.use(function(req, res, next) {
    //if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }

    fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.use(express.static(staticRoot));

app.listen(app.get('port'), function() {
    console.log('app running on port', app.get('port'));
});
