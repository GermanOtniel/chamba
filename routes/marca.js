const router = require("express").Router();
const Marca = require("../models/Marca");
const Brand = require("../models/Brand");

router.post('/new',(req,res, next)=>{
  Marca.create(req.body)
  .then(marca=>{
      Brand.findByIdAndUpdate(req.body.brand._id,{
        $push: { marcas: marca._id }
      },{ 'new': true})
      .then(brand=>{
        console.log(brand)
      })
      .catch(e=>console.log(e))
      res.json(marca)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Marca.find()
  .populate('brand')
  .then(marcas=>{
      res.json(marcas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
router.get('/bybrand',(req,res,next)=>{
  Marca.find({ brand:'5b563f90c2cf5a086cbc08f5' })
  .then(marcas=>{
      res.json(marcas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
