//GOOGLE OAUTH2.0
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/User");


const strategy = new GoogleStrategy({
  clientID: process.env.CLIENT_ID_NEW,
  clientSecret: process.env.CLIENT_SECRET_NEW,
  callbackURL: "http://localhost:3000/auth/google/callback"
},(accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      //EL USUARIO YA ESTA LOGUEADO
      //console.log(user)
      return done(null, user);
    } else {
      const newUser = new User({
        googleID: profile.id,
        correo: profile.emails[0].value,
        nombreUsuario: profile.displayName
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        else{
          //EL USUARIO ES NUEVO
          done(null, newUser);
          //console.log(newUser);
        }
      });
    }

  });

})

module.exports = strategy;
