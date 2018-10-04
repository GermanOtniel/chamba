const router = require("express").Router();
const Zona = require("../models/Zona");
const Estado = require("../models/Estado");

// CREAR UNA ZONA EN EL DASHBOARD
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

// MOSTRAR TODAS LAS ZONAS EN EL DASHBOARD SE PUEDE USAR PARA CREAR UN CENTRO DE CONSUMO NUEVO O PARA CREAR UNA DINAMICA, 
// PIENSO QUE ESTE ES MAS PARA CREAR UNA DINAMICA.
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

// NO SE HAY QUE RASTREARLA
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