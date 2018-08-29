const router = require("express").Router();
const Nota = require("../models/Nota");

//HASTA AHORITA NO SE USAN 

router.post('/new',(req,res, next)=>{
  Nota.create({
    cuerpo: req.body.cuerpo
})
  .then(nota=>{
      res.json(nota)
  })
  .catch(e=>next(e))
});
router.get('/:id',(req,res,next)=>{
  Nota.find({destinatario:req.params.id})
  .populate('dinamica')
  .populate('evidenciaPertenece')
  .then(notas=>{
      res.json(notas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
