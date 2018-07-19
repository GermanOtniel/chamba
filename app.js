require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const hbs          = require('hbs');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
//PASSPORT
const passport     = require("./helpers/passport");
const session      = require("express-session"); 
const cors         = require("cors");



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
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
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
//passport.use();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieSession({
//   name: 'session',
//   keys: ['123']
// }));
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
const nota        =require('./routes/nota');
const dash        =require('./routes/authDash');
app.use('/dash',dash);
app.use('/nota',nota);
app.use('/evidencia',evidencia);
app.use('/brand',brand)
app.use('/marca',marca);
app.use('/ctrconsumo',ctrconsumo);
app.use('/dinamica',dinamica);
app.use('/',index);
app.use('/auth', auth);


module.exports = app;
