var Client = require('node-rest-client').Client;
var testAuth = require("./../testAuth.json");

var client = new Client();

// set content-type header and data as json in args parameter
var args = {
    headers: { "User-Agent": "chobberoni", "Authorization": testAuth["token"] }
};

// registering remote methods
client.registerMethod("gistsMethod", "https://api.github.com/gists/public", "GET");
client.registerMethod("bigSearchMethod", "https://api.github.com/search/code?q=search+in:file+language:js+user:jquery", "GET");

module.exports = {
  //calling some f(x)s
  client.methods.gistsMethod(args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
  });

  client.methods.bigSearchMethod(args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
  });
};
