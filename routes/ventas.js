const router = require("express").Router();
const Ventas = require("../models/Ventas");

router.get('/:id',(req,res,next)=>{
  Ventas.find({ user: req.params.id })
  .populate('dinamica')
  .then(ventas=>{
      res.json(ventas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

module.exports = router;