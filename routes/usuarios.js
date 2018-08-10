const router = require("express").Router();
const User   = require("../models/User");

// SE USA EN LE DASHBOARD PARA TRAER TODOS LOS USUARIOS 
// OTRA RUTA QUE DEBERIA DE IR AQUI PERO ESTA EN authDash.js 
//ES LA VER CIERTO USUARIO Y LA DE EDITAR CIERTO USUARIO PARA DARLE CIERTO ROL
 
router.get('/',(req,res,next)=>{
  User.find()
  .then(usuarios=>{
      res.json(usuarios);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

module.exports = router;