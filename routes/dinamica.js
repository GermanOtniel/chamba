const router = require("express").Router();
const Dinamica = require("../models/Dinamica");
const Brand = require("../models/Brand");

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
  .then(dinamicas=>{
      res.json(dinamicas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
router.get('/:id' ,(req,res)=>{
    Dinamica.findById(req.params.id)
    .populate('marcas')
    .then(dinamica=>{
      res.json(dinamica);
    })
  });

  router.post('/winner/:id' ,(req,res)=>{
    //console.log('BODY: ',req.body,'PARAMS: ',req.params.id)
    Dinamica.findByIdAndUpdate(req.params.id,{
      $push: { ganadores: req.body.ganador }
      },{ 'new': true})
    .then(dinamica=>{
      res.json(dinamica);
    })
    .catch(e=>console.log(e)) 
  });
module.exports = router;
