var express = require('express');
var app = express();

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(3000, function() {
    console.log('Express is listening to http://localhost:3000');
});
