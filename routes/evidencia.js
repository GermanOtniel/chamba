const router = require("express").Router();
const Evidencia = require("../models/Evidencia");
const Dinamica = require("../models/Dinamica");

router.post('/new',(req,res, next)=>{
  console.log(req.body)
  Evidencia.create(req.body)
  .then(evidencia=>{
      Dinamica.findByIdAndUpdate(req.body.dinamica,{
        $push: { evidencias: evidencia._id }
      },{ 'new': true})
      .then(dinamica=>{
        console.log(dinamica)
      })
      .catch(e=>console.log(e))
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Evidencia.find()
  .populate('creador')
  .populate('dinamica')
  .then(evidencias=>{
      res.json(evidencias);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
router.get('/:id' ,(req,res)=>{
  Evidencia.findById(req.params.id)
  .populate('creador')
  .then(evidencia=>{
    res.json(evidencia);
  })
});
router.post('/evi/:id',(req,res, next)=>{
  console.log(req.body)
  Evidencia.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(evidencia=>{
    console.log(evidencia.status)
    res.json(evidencia);
  })
  .catch(e=>next(e));
});
module.exports = router;
