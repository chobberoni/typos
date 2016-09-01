var Client = require('node-rest-client').Client;
var testAuth = require("./../testAuth.json");

var client = new Client();

// set content-type header and data as json in args parameter
var args = {
    headers: { "User-Agent": "chobberoni", "Authorization": testAuth["token"] }
};

// registering remote methods
client.registerMethod("jsonMethod", "https://api.github.com/gists/public", "GET");

client.methods.jsonMethod(args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
});
