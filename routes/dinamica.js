const router = require("express").Router();
const Dinamica = require("../models/Dinamica");
const Brand = require("../models/Brand");
const Marca = require("../models/Marca");
const Ventas = require("../models/Ventas");

router.post('/new',(req,res, next)=>{
  Dinamica.create(req.body)
  .then(dinamica=>{
      Brand.findByIdAndUpdate(req.body.brand,{
        $push: { dinamicas: dinamica._id }
        },{ 'new': true})
        .then(brand=>{
        })
        .catch(e=>console.log(e))
    res.json(dinamica)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Dinamica.find()
  .populate('brand')
  .populate('marcas')
  .populate({ path: 'marcaPuntosVentas._id', model: Marca })
  .then(dinamicas=>{
      res.json(dinamicas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
router.get('/:id' ,(req,res)=>{
    Dinamica.findById(req.params.id)
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .populate('evidencias')
    .populate('centroConsumo')
    .then(dinamica=>{
      res.json(dinamica);
    })
  });

  router.post('/winner/:id' ,(req,res)=>{
    //console.log('BODY: ',req.body,'PARAMS: ',req.params.id)
    Dinamica.findByIdAndUpdate(req.params.id,{
      $push: { ganadores: req.body.winner }
      },{ 'new': true})
    .then(dinamica=>{
      Ventas.update({"dinamica": dinamica._id}, //query, you can also query for email
      {$set: {"status": "Canjeada"}},
      {"multi": true})
      .then(ventas=>{
        console.log(ventas)
      })
      .catch(e=>console.log(e))
      res.json(dinamica);
    })
    .catch(e=>console.log(e)) 
  });
module.exports = router;
