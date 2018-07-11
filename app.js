require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
//PASSPORT
const passport     = require("./helpers/passport");
const session      = require("express-session"); 
const cors         = require("cors");
//GOOGLE OAUTH2.0
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("./models/User");



//conectar mi base de datos de mongo, debo crear otro usuario y otra contraseña
// para que sea mas seguro. Debo guardar estos datos en mi archivo de variables de entrono .env
mongoose.Promise = Promise;
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

//CORS
const options = {
  credentials: true,
  origin: true
}
app.use(cors(options));


//session
app.use(session({
  secret: "secret",
  resave:false,
  saveUninitialized:true
}));

//initialize passport

app.use(passport.initialize());
app.use(passport.session());

//importante para la autenticacion de google
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//Google authenticate
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},(accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id,
      correo: profile.emails[0].value,
      nombreUsuario: profile.displayName
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const auth        = require('./routes/auth');
const index       = require('./routes/index');
const dinamica    = require('./routes/dinamica');
const ctrconsumo  = require('./routes/ctrconsumo');
const marca       = require('./routes/marca');
const brand       = require('./routes/brand');
const evidencia   =require('./routes/evidencia');
app.use('/evidencia',evidencia);
app.use('/brand',brand)
app.use('/marca',marca);
app.use('/ctrconsumo',ctrconsumo);
app.use('/dinamica',dinamica);
app.use('/',index);
app.use('/auth', auth);


module.exports = app;
