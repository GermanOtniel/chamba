const router = require("express").Router();
const Evidencia = require("../models/Evidencia");

router.post('/new',(req,res, next)=>{
  Evidencia.create({
    creador:req.user,
    mensaje: req.body.mensaje
})
  .then(evidencia=>{
      res.json(evidencia)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Evidencia.find()
  .then(evidencias=>{
      res.json(evidencias);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
