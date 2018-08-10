const router = require("express").Router();
const Pais = require("../models/Pais");

// SE USAN EN EL DASHBOARD PARA CREAR Y ENCONTRAR UN PAIS

router.post('/new',(req,res, next)=>{
  Pais.create(req.body)
  .then(pais=>{
      res.json(pais)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Pais.find()
  .then(paises=>{
      res.json(paises);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;