const router = require("express").Router();
const Estado = require("../models/Estado");
const Pais   = require("../models/Pais");


// SE USAN SOLO EN EL DASHBOARD PARA CREAR ESTADOS Y REPRESENTARLOS

router.post('/new',(req,res, next)=>{
  Estado.create(req.body)
  .then(estado=>{
        Pais.findByIdAndUpdate(req.body.pais._id,{
            $push: { estados: estado._id }
            },{ 'new': true})
        .then(pais=>{
            console.log(pais)
            })
        .catch(e=>console.log(e))
    res.json(estado)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Estado.find()
  .then(estados=>{
      res.json(estados);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;