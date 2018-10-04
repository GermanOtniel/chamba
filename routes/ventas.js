const router = require("express").Router();
const Ventas = require("../models/Ventas");
const Marca = require("../models/Marca");


// TRAER TODAS LAS VENTAS DE CIERTO USUARIO SIEMPRE Y CUANDO NO ESTEN CANJEADAS
// SE USA EN LA PWA EN LA SECCION MIS VENTAS
router.get('/:id',(req,res,next)=>{
  Ventas.find({ user: req.params.id, status:"No Canjeada" })
  .populate('dinamica')
  .populate({ path: 'marcas._id', model: Marca })
  .populate({ path: 'marcas._id', model: Marca })
  .then(ventas=>{
      res.json(ventas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

module.exports = router;