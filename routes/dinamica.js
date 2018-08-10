const router = require("express").Router();
const Dinamica = require("../models/Dinamica");
const Brand = require("../models/Brand");
const Marca = require("../models/Marca");
const Ventas = require("../models/Ventas");


// AQUI ESTAN REVUELTAS UNAS SE USAN SOLO PARA EL DASHBOARD Y OTRAS PARA DASHBOARD Y PWA

// 1) DASHBOARD, CREAR DINAMICAS
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

// 2) ESTA RUTA SE USA PARA TRAER TODAS LAS DINAMICAS EXISTENTES Y QUE SE REPRESENTEN EN LA 
// PWA Y EN EL DASHBOARD, 
//EN UN FUTURO QUERREMOS QUE:
//LA RUTA QUE REPRESENTE LAS DINAMICAS A UN USUARIO EN LA PWA
// SOLO LE REPRESENTE LAS DINAMICAS QUE TENGAN A SU CENTRO DE CONSUMO
// Y QUE EN EL DASHBOARD SOLO SE REPRESENTEN LAS QUE PERTENEZCAN AL BRAND DEL USUARIO DASHBOARD

// POR LO MIENTRAS SEGUIREMOS USANDO ESTA MISMA PARA AMBAS COSAS.
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

// 3) SE USA PARA DASHBORD Y PWA
// ME DA EL DETALLE DE CIERTA DINAMICA
router.get('/:id' ,(req,res)=>{
    Dinamica.findById(req.params.id)
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .populate('evidencias')
    .populate('centroConsumo')
    .then(dinamica=>{
      res.json(dinamica);
    })
  });


  // 4) SE USA EN LA PWA SOLAMENTE
  // CUANDO UN USUARIO CUMPLE CON LAS METAS DE CIERTA DINAMICA SE HABILITA UN BOTON CON ESTA
  //RUTA PARA QUE EL USUARIO SEA PUSHEADO A LA DINAMICA CORRESPONDIENTE COMO UN GANADOR
  router.post('/winner/:id' ,(req,res)=>{
    //console.log('BODY: ',req.body,'PARAMS: ',req.params.id)
    Dinamica.findByIdAndUpdate(req.params.id,{
      $push: { ganadores: req.body.winner }
      },{ 'new': true})
    .then(dinamica=>{
      Ventas.update({"dinamica": dinamica._id,"user":req.body.winner}, //query, you can also query for email
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


  // 5) SE USA EN EL DASHBOARD, AUN TRABAJAREMOS MAS EN ELLA:
  
  // SI UN USUARIO HA TENIDO BUENAS VENTAS PERO AUN NO HA CUMPLIDO 
  //CON A META DE ALGUN PODUCTO PERO QUEREMOS PREMIARLO POR SU BUEN DESEMPEÑO
  // PODEMOS CONVERTIRLO EN GANADOR CON UN BOTON QUE HABILITA ESTA RUTA 
  router.post('/winnerdash/:id' ,(req,res)=>{
    //console.log('BODY: ',req.body,'PARAMS: ',req.params.id)
    Dinamica.findByIdAndUpdate(req.params.id,{
      $push: { ganadores: req.body._id }
      },{ 'new': true})
    .then(dinamica=>{
      // Ventas.update({"dinamica": dinamica._id}, //query, you can also query for email
      // {$set: {"status": "Canjeada"}},
      // {"multi": true})
      // .then(ventas=>{
      //   console.log(ventas)
      // })
      // .catch(e=>console.log(e))
      // res.json(dinamica);
    })
    .catch(e=>console.log(e)) 
  });
module.exports = router;
