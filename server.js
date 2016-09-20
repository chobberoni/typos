var express = require('express');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var testAuth = require("./testAuth.json");


//use passport via GitHub

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: testAuth["GCLIENT_ID"],
    clientSecret: testAuth["GCLIENT_SECRET"],
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
    //console.log(profile.id);
  }
));


//initialize express application (credit to https://github.com/passport)
var app = express();
app.use(express.static(__dirname + '/views'));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }),
function(req, res){
  // The request will be redirected to GitHub for authentication, so this
  // function will not be called.
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.redirect('https://google.com');
//   });


var server = app.listen(3000, function() {
    console.log('Express is listening to http://localhost:3000');
});
