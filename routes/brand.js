const router = require("express").Router();
const Brand = require("../models/Brand");
const User = require("../models/User");

// SE USAN EN EL DASHBOARD 


// 1) CREAR BRANDS
router.post('/new',(req,res, next)=>{
  Brand.create(req.body)
  .then(brand=>{
      res.json(brand)
  })
  .catch(e=>next(e))
});

// 2) CONSEGUIR TODOS LOS BRANDS PARA EDITAR UN USUARIO 
// ASIGNARLE SU PUESTO Y A QUE BRAND PERTENECERA
router.get('/',(req,res,next)=>{
  Brand.find()
  .then(brands=>{
      res.json(brands);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

// PARA TRAER EL BRAND ESPECIFICO D EUN USUARIO PARA QUE CREE UNA MARCA
router.get('/dash/:id',(req,res,next)=>{
    Brand.find({_id:req.params.id})
    .then(brands=>{
        res.json(brands);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })

// 3) ESTA SE USA EN EL COMPONENETE DE DINAMICAS DEL DASHBOARD 
// PARA QUE CUANDO UN USUARIO DE UN BRAND CREE UNA DINAMICA LE 
//SALGAN LAS MARCAS DE ESE BRAND EN ESPECIFICO
router.get('/:id',(req,res,next)=>{
    Brand.findById(req.params.id)
    .populate('marcas')
    .then(brand=>{
        res.json(brand);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })

  // 4) TRAER USUARIOS DE UN BRAND DASHBOARD

  router.get('/users/:id',(req,res,next)=>{
    User.find({brand:req.params.id})
    .then(users=>{
        res.json(users);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })
module.exports = router;
