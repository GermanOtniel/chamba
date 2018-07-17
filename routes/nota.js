const router = require("express").Router();
const Nota = require("../models/Nota");

router.post('/new',(req,res, next)=>{
  Nota.create({
    cuerpo: req.body.cuerpo
})
  .then(nota=>{
      res.json(nota)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Nota.find()
  .then(notas=>{
      res.json(notas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
