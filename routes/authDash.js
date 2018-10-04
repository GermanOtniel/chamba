const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const transporter = require('../helpers/nodemailer');


function isAuthenticated(req,res,next){
  if(req.isAuthenticated())
  {
    return next();
  }
  else
  {
    res.redirect('/')
  }   
}


// COMO SU NOMBRE LO DICE ES LA AUTENTICACION PARA EL DASHBOARD

// 1) DARSE DE ALTA O REGISTRARSE
router.post('/signup', (req,res)=>{
  User.register(req.body, req.body.password, function(err, user) {
      if (err) return res.json(err);
        res.json(user);
      })
});

// 2) LOGUEARTE, SE REQUIEREN PERMISOS PARA INGRESAR AL DASHBOARD
router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  return res.json(req.user);
});

// 3) DESLOGUEARTE 
router.get('/logout' ,(req,res)=>{
  req.logout();
  res.status(200);
  res.send('Sesión finalizada')
})

// 4) NO SE HA HABILITADO UNA SECCION PARA USAR ESTA RUTA PERO ES PARA QUE EL USUARIO VEA SU PERFIL
router.get('/profile/:id' ,(req,res)=>{
  User.findById(req.params.id)
  .populate('centroConsumo','nombre')
  .then(user=>{
    res.json(user);
  })
});

// 5) SE USA PARA EDITAR EL PUESTO DE UN USUARIO DEL DASHBOARD
//ESTA RUTA DEBERIA DE IR EN EL ARCHIVO DE usuarios.js 
router.post('/user/:id',(req,res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(user=>{
    res.json(user);
  })
  .catch(e=>next(e));
});

// 5) ALGUIEN OLVIDO SU CONTRASEÑA
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

// 6) ALGUIEN ESTA CAMBIANDO SU CONTRASEÑA
router.post('/password/dash',(req,res, next)=>{
  User.findByUsername(req.body.correo).then(function(sanitizedUser){
    if (sanitizedUser){
        sanitizedUser.setPassword(req.body.newPasswordString, function(){
            sanitizedUser.save();
            res.status(200).json({message: 'Tu contraseña ha sido actualizada satisfactoriamente.'});
        });
    } else {
        res.status(500).json({message: 'This user does not exist'});
    }
},function(err){
    console.error(err);
})
});

module.exports = router;