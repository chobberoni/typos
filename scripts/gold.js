var Client = require('node-rest-client').Client;
var testAuth = require("./../testAuth.json");


// var octo = new Octokat({
//   token: process.env.G_TOKEN
// });

var client = new Client();

// direct way
// client.get("http://api.github.com/gists/public", function (data, response) {
//     // parsed response body as js object
//     console.log(data);
//     // raw response
//     console.log(response);
// });

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
