const router = require("express").Router();
const CtrConsumo = require("../models/CentroConsumo");
const Zona = require("../models/Zona");

// SE USAN EN EL DASHBOARD


// 1) CREAR UN NUEVO CENTRO DE CONSUMO
router.post('/new',(req,res, next)=>{
  CtrConsumo.create(req.body)
  .then(centro=>{
    Zona.findByIdAndUpdate(req.body.zona._id,{
        $push: { centros: centro._id }
        },{ 'new': true})
    .then(zona=>{
        //console.log(zona)
        })
    .catch(e=>console.log(e)) 
  res.json(centro)
  })
  .catch(e=>next(e))
});


// 2) CONSEGUIR TODOS LOS CENTROS DE CONSUMO PARA REPRESENTARLOS EN UNA TABLA EN EL DASHBOARD
router.get('/',(req,res,next)=>{
  CtrConsumo.find()
  .populate('zona','nombre')
  .then(centros=>{
      res.json(centros);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
