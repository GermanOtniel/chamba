const router = require("express").Router();
const Marca = require("../models/Marca");

router.post('/new',(req,res, next)=>{
  Marca.create(req.body)
  .then(marca=>{
      res.json(marca)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Marca.find()
  .then(marcas=>{
      res.json(marcas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
