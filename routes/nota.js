const router = require("express").Router();
const Nota = require("../models/Nota");


router.post('/new',(req,res, next)=>{
  Nota.create(req.body)
  .then(nota=>{
      res.json(nota)
  })
  .catch(e=>next(e))
});

// 

router.get('/:id',(req,res,next)=>{
  Nota.find({$or:[{destinatario:req.params.id},{todos:true}]})
  .populate('dinamica')
  .populate('evidenciaPertenece')
  .then(notas=>{
      res.json(notas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

router.delete('/delete/:id',(req,res,next)=>{
    Nota.findOneAndRemove({_id:req.params.id})
    .then(r=>{
        console.log(r)
    })
    .catch(e=>console.log(e))
})

router.get('/bybrand/:id',(req,res,next)=>{
    Nota.find({remitenteOtro:req.params.id})
    .populate('dinamica')
    .populate('evidenciaPertenece')
    .populate('remitenteOtro')
    .then(notas=>{
        res.json(notas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })

  router.get('/',(req,res,next)=>{
    Nota.find()
    .populate('remitenteOtro')
    .then(notas=>{
        res.json(notas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })

module.exports = router;
