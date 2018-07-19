//aqui configuramos passport
const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("./googlestrategy");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(User.createStrategy());
passport.use(GoogleStrategy);


module.exports = passport;