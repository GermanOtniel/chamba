const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

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
//ESTA RUTA DEBERIA DE IR EN EL ARCHIVODE usuarios.js 
router.post('/user/:id',(req,res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(user=>{
    res.json(user);
  })
  .catch(e=>next(e));
});


module.exports = router;