const router = require("express").Router();
const Brand = require("../models/Brand");

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
module.exports = router;
