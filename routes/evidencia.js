const router = require("express").Router();
const Evidencia = require("../models/Evidencia");
const Dinamica = require("../models/Dinamica");
const Puntos = require("../models/Puntos");
const Ventas = require("../models/Ventas");
const User = require("../models/User");
const Nota = require("../models/Nota");
const Marca = require("../models/Marca");


router.post('/new',(req,res, next)=>{
  Evidencia.create(req.body)
  .then(evidencia=>{
      Dinamica.findByIdAndUpdate(req.body.dinamica,{
        $push: { evidencias: evidencia._id }
      },{ 'new': true})
      .then(dinamica=>{
        console.log(dinamica)
      })
      .catch(e=>console.log(e))
      User.findByIdAndUpdate(req.body.creador,{
        $push: { evidencias: evidencia._id }
      },{ 'new': true})
      .then(user=>{
      })
    .catch(e=>console.log(e))
    res.json(evidencia);
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Evidencia.find()
  .populate('creador')
  .populate('dinamica')
  .then(evidencias=>{
      res.json(evidencias);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
router.get('/dinamica/:id',(req,res,next)=>{
  Evidencia.find({dinamica:req.params.id,status:"Aprobada"})
  .populate('creador')
  .populate('dinamica')
  .populate({ path: 'marcas._id', model: Marca })
  .then(evidencias=>{
      res.json(evidencias);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
router.get('/:id' ,(req,res)=>{
  Evidencia.findById(req.params.id)
  .populate('creador')
  .populate('dinamica')
  .populate({ path: 'marcas._id', model: Marca })
  .then(evidencia=>{
    res.json(evidencia);
  })
});

//ESTA RUTA ES DONDE EL EJECUTIVO APRUEBA O RECHAZA UNA EVIDENCIA.
router.post('/evi/:id',(req,res, next)=>{
  Evidencia.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(evidencia=>{
    if(evidencia.status === "Aprobada" && evidencia.modalidad === "Puntos")
    { 
      let marcas = evidencia.marcas.map(marca=>marca)
      let puntos = 0;
      for (let i = 0; i<marcas.length; i++){
        puntos += marcas[i].ventas * marcas[i].puntosVentas
      }
      User.findOneAndUpdate({_id: req.body.creador._id}, { $inc: {calificacion: puntos}})
        .then(user=>{
          console.log(user)
        })
        .catch(e=>console.log(e))
    }
    else if (evidencia.status === "Aprobada" && evidencia.modalidad === "Ventas")
    {
      let bodyVentas = {
        marcas: evidencia.marcas,
        brand: req.body.dinamica.brand,
        dinamica: req.body.dinamica._id,
        user: req.body.creador._id
      }
      Ventas.create(bodyVentas)
       .then(ventas=>{
        User.findByIdAndUpdate(req.body.creador._id,{
          $push: { ventas: ventas._id }
        },{ 'new': true})
        .then(user=>{
        })
        .catch(e=>console.log(e))
       })
       .catch(e=>console.log(e))
    }
    else if ( evidencia.status === "Desaprobada" )
    {
      let bodyNota = {
        cuerpo: req.body.nota,
        destinatario: req.body.creador._id,
        remitenteOtro: req.body.dinamica.brand,
        evidenciaPertenece: evidencia._id,
        dinamica: req.body.dinamica._id
      }
      Nota.create(bodyNota)
       .then(nota=>{
        User.findByIdAndUpdate(req.body.creador._id,{
          $push: { notas: nota._id }
        },{ 'new': true})
        .then(user=>{
        })
        .catch(e=>console.log(e))
       })
       .catch(e=>console.log(e))
    }
    res.json(evidencia);
  })
  .catch(e=>next(e));
});
module.exports = router;
