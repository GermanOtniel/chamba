const router = require("express").Router();
const User   = require("../models/User");

// SE USA EN LE DASHBOARD PARA TRAER TODOS LOS USUARIOS 
// OTRA RUTA QUE DEBERIA DE IR AQUI PERO ESTA EN authDash.js 
//ES LA VER CIERTO USUARIO Y LA DE EDITAR CIERTO USUARIO PARA DARLE CIERTO ROL
 
router.get('/',(req,res,next)=>{
  User.find()
  .populate('centroConsumo')
  .then(usuarios=>{
      res.json(usuarios);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})



// ES PARA AGREGAR HABILIDADES A UN USUARIO DESDE EL DASHBOARD

router.post('/edithabilities/:id',(req,res, next)=>{
    User.findByIdAndUpdate(req.params.id,{ $push: { habilidades: req.body}},{'new' : true})
    .then(user=>{
        User.update({_id:user._id},{$pop:{habilidades:-1}})
            .then(user=>{
                res.json('Succesfull')
            })
            .catch(e=>console.log(e))
    })
    .catch(e=>next(e));
  });


// TRAER USUARIOS POR FECHA DE REGISTRO 

// router.get('/',(req,res,next)=>{
//     let startDate = "2018-11-29T00:01:00.175Z";
//     let endDate = "2018-11-30T17:36:22.175Z";
//   User.find({ created_at: { $gte: startDate, $lt: endDate }})
//   .populate('centroConsumo')
//   .then(usuarios=>{
//       res.json(usuarios);
//   })
//   .catch(e=>{
//       res.send('No funco papu...')
//   })
// })

module.exports = router;