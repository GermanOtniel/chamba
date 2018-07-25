const router = require("express").Router();
const Zona = require("../models/Zona");
const Estado = require("../models/Estado");


router.post('/new',(req,res, next)=>{
  Zona.create(req.body)
  .then(zona=>{
     Estado.findByIdAndUpdate(req.body.estado._id,{
            $push: { zonas: zona._id }
            },{ 'new': true})
        .then(estado=>{
            console.log(estado)
            })
        .catch(e=>console.log(e))
    res.json(zona)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Zona.find()
  .populate('estado','nombre')
  .populate('centros')
  .then(zonas=>{
      res.json(zonas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
router.get('/one',(req,res,next)=>{
    console.log('BBBOOOODDDYYYYY',req.body)
    Zona.findById(req.body.zonaId)
    .populate('centros','nombre')
    .then(zona=>{
        res.json(zona);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })
module.exports = router;