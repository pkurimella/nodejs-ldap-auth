var express = require('express'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  LdapStrategy = require('passport-ldapauth');

var OPTS = {
  server: {
    url: 'ldap://localhost',
    bindDN: 'cn=admin,dc=example,dc=org',
    bindCredentials: 'admin',
    searchBase: 'dc=example,dc=org',
    searchFilter: '(cn={{username}})'
  }
};

var app = express();

passport.use(new LdapStrategy(OPTS,
  function (user, done) {
    //console.log('UU', user);
    return done(null, user);
  }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post('/login', passport.authenticate('ldapauth', { session: false }), function (req, res) {

  res.send({ status: 'ok' });

});


app.post('/login2', function (req, res, next) {
  passport.authenticate('ldapauth', function (err, user, info) {
    console.log(info);
    console.log(err);
    if (info)
      return res.status(401).send(info);
    else if (user)
      return res.send(user);
    else
      return res.status(401);
  })(req, res, next);
});


app.listen(8009);

module.exports = app;