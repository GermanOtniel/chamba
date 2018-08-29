const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const CtrCons = require("../models/CentroConsumo");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// router.get("/google", passport.authenticate("google", {
//   scope: ['profile','email']
// }));

// router.get("/google/callback", passport.authenticate("google"),(req,res)=>{
//   return res.json(req.user)
// });
// router.get('/auth/google/callback',
//     passport.authenticate('google', {failureRedirect:'/'}),
//     (req, res) => {
//         req.session.token = req.user.token;
//         res.redirect('auth/profile/:id');
//     }
// );

// ----------------------------------

// ESTAS RUTAS SE USAN EN LA PWA 

// 1) AUTENTICAR CON GOOGLE
router.post('/google', (req,res)=>{
  console.log(req.body.googleId);
  User.findOne({ googleID: req.body.googleId }, (err, user) => {
      if (err) {
        console.log(err);
      }
      if (user) {
        //EL USUARIO YA ESTA LOGUEADO
        //console.log(user)
        // done(null, user);
        return res.json(user);
      } else {
        const newUser = new User({
          googleID: req.body.googleId,
          correo: req.body.correo,
          nombreUsuario: req.body.nombreUsuario
        });
      
        newUser.save((err) => {
          if (err) {
            return done(err);
          }
          else{
            //EL USUARIO ES NUEVO
            //done(null, newUser);
            return res.json(newUser);
            //console.log(newUser);
          }
        });
      }
  });
});

// 2) REGISTRARME EN LA APP
router.post('/signup', (req,res)=>{
  User.register(req.body, req.body.password, function(err, user) {
      if (err) return res.json(err);
        res.json(user);
      })
});

// 3) LOGUEARME UNA VEZ QUE YA ESTOY REGISTRADO
router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  return res.json(req.user);
});

// 4) DESLOGUEARME DE LA APP
router.get('/logout' ,(req,res)=>{
  req.logout();
  res.status(200);
  res.send('Sesión finalizada')
})

// 5) LA RUTA PARA ENTRAR A MI PERFIL 
router.get('/profile/:id' ,(req,res)=>{
  User.findById(req.params.id)
  .populate('centroConsumo','nombre')
  .populate('brand')
  .populate('puntos')
  .then(user=>{
    res.json(user);
  })
});

// 6) RUTA PARA EDITAR MI PERFIL
router.post('/profile/:id',(req,res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(user=>{
    if(req.body.centroConsumo !== undefined ){
      CtrCons.findByIdAndUpdate(req.body.centroConsumo._id,{
        $push: { usuarios: user._id }
      },{ 'new': true})
      .then(ctr=>{
      })
      .catch(e=>console.log(e))
    }
    res.json(user);
  })
  .catch(e=>next(e));
});

module.exports = router;
