const router = require("express").Router();
const Evidencia = require("../models/Evidencia");
const Dinamica = require("../models/Dinamica");

router.post('/new',(req,res, next)=>{
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
  .then(evidencias=>{
      res.json(evidencias);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
