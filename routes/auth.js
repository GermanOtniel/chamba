const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const CtrCons = require("../models/CentroConsumo");
const transporter = require('../helpers/nodemailer');


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

// 1.1) AUTENTICAR REGISTRAR CON GOOGLE
router.post('/google', (req,res)=>{
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
          nombreUsuario: req.body.nombreUsuario,
          terminosCondiciones: req.body.terminosCondiciones,
          habilidades:[
            {
              "_id": null,
              "limpieza": 5,
              "puntualidad": 5,
              "disciplinado": 5,
              "colaborativo": 5
          },
          {
              "_id": null,
              "limpieza": 5,
              "puntualidad": 5,
              "disciplinado": 5,
              "colaborativo": 5
          },
          {
              "_id": null,
              "limpieza": 5,
              "puntualidad": 5,
              "disciplinado": 5,
              "colaborativo": 5
          }
          ],
          documentos:{
            "idOficial": "https://firebasestorage.googleapis.com/v0/b/filetest-210500.appspot.com/o/testing%2Fnoimagen.jpg?alt=media&token=ce3e9648-3740-465b-bc26-3318de70d4b0",
            "actaNac": "https://firebasestorage.googleapis.com/v0/b/filetest-210500.appspot.com/o/testing%2Fnoimagen.jpg?alt=media&token=ce3e9648-3740-465b-bc26-3318de70d4b0",
            "curp": "https://firebasestorage.googleapis.com/v0/b/filetest-210500.appspot.com/o/testing%2Fnoimagen.jpg?alt=media&token=ce3e9648-3740-465b-bc26-3318de70d4b0"
        }
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
// 1.2) AUTENTICAR INICIAR SESION CON GOOGLE
router.post('/login/google', (req,res)=>{
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
        return res.json("NER");
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
    // if(req.body.centroConsumo !== undefined ){
    //   CtrCons.findByIdAndUpdate(req.body.centroConsumo._id,{
    //     $push: { usuarios: user._id }
    //   },{ 'new': true})
    //   .then(ctr=>{
    //   })
    //   .catch(e=>console.log(e))
    // }
    res.json(user);
  })
  .catch(e=>next(e));
});

// 7) ALGUIEN OLVIDO SU CONTRASEÑA
router.post('/password',(req,res, next)=>{
  let fecha = new Date()
  let numero = Math.random(2)
  let fechaString1 = String(fecha).slice(16,24)
  let fechaString2 = String(numero).slice(2,6)
  var destinatario = req.body.correito
  var newPasswordString = fechaString1 + fechaString2
  var content = `Hola ${destinatario}, lamentamos que hayas olvidado tu contraseña, pero para eso esta 1puntocinco para ayudar a la gente que queremos y eso te incluye a ti. \n 
  Te estamos mandando tu contraseña temporal para que puedas tener de nueva cuenta acceso a tu perfil de usuario, tu contraseña temporal es: ${newPasswordString} \n 
  Te recomendamos que una vez que hayas tenido acceso a tu cuenta actualices de nuevo tu contraseña (una que no olvides :D) para que asi solo tu sepas cual es. \n
  Aún si la vuelves a olvidar aqui estamos para ayudarte...\n
  Te agradaceremos que no respondas este correo.
  \n
  \n
  Tus amigos de 1puntocinco...`

  var mail = {
    from: process.env.USER,
    to: destinatario,  //Change to email address that you want to receive messages on
    subject: 'Contraseña restaurada:',
    text: content
  }
  User.findByUsername(req.body.correito).then(function(sanitizedUser){
    if (sanitizedUser){
        sanitizedUser.setPassword(newPasswordString, function(){
            sanitizedUser.save();

            transporter.sendMail(mail, (err, data) => {
              if (err) {
                res.json({
                  msg: 'fail'
                })
              } else {

              }
            })

            res.status(200).json({message: 'password reset successful'});
        });
    } else {
        res.status(500).json({message: 'This user does not exist'});
    }
},function(err){
    console.error(err);
})
});

// 8) ALGUIEN ESTA CAMBIANDO SU CONTRASEÑA
router.post('/password/pwa',(req,res, next)=>{
  User.findByUsername(req.body.correo).then(function(sanitizedUser){
    if (sanitizedUser){
        sanitizedUser.setPassword(req.body.newPasswordString, function(){
            sanitizedUser.save();
            res.status(200).json({message: 'password reset successful'});
        });
    } else {
        res.status(500).json({message: 'This user does not exist'});
    }
},function(err){
    console.error(err);
})
});

module.exports = router;
