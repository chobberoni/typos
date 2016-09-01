var Octokat = require('octokat');
var octo = new Octokat({
  token: process.env.G_TOKEN
});

// You can omit `cb` and use Promises instead
var cb = function (err, val) { console.log(val); };

octo.zen.read(cb);
//octo.repos('chobberoni', 'beagle134').fetch(cb);    // Fetch repo info

octo.search.code.fetch({q: "javascriptREGEX"}).then(function(issues) { console.log(val); });
octo.search.code.fetch({q: "grammar repo:philschatz/octokat.js"}).then(log)
