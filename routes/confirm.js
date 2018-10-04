const router = require("express").Router();
const transporter = require('../helpers/nodemailer');
const User = require("../models/User");

// SE CREA UN EMAIL DE VERIFICACION DE CORREO Y UNA VEZ ENVIADO EL CORREO SE CAMBIA EL ATRIBUTO DE CORREO ENVIADO DEL USUARIOA TRUE
// PARA QUE YA NO SE LE VUELVA A MANDAR ESE CORREO
router.post('/email/:id' ,(req,res)=>{
  var destinatario = req.body.dest
  var direccion = req.body.sitio + req.params.id
  var content = `Hola ${destinatario}, te damos la bienvenida a la comunidad 1puntocinco. \n 
  Te pedimos que visites la siguiente dirección ${direccion} para poder confirmar tu cuenta.`

  var mail = {
    from: process.env.USER,
    to: destinatario,  //Change to email address that you want to receive messages on
    subject: 'Correo de confirmación:',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      User.findByIdAndUpdate(req.params.id, {$set: { correoEnviado:true } }, { 'new':true } )
      .then(user=>{
        res.json(user)
      })
      .catch(e=>console.log(e))
    }
  })
});

// ES LA RUTA QUE VISITA UN USUARIO CUANDO CONFIRMA SU CORREO ELECTRONICO
// CUANDO VISITA ESTA PAGINA O ESTA URL EL ATRIBUTO DE CUENTACONFIRMADA DE ESE USUARIO CAMBIA A TRUE
router.get('/:id' ,(req,res)=>{
  User.findByIdAndUpdate(req.params.id, {$set: { cuentaConfirmada:true } }, { 'new':true } )
  .then(r=>{
    res.render('profile')
  })
  .catch(e=>console.log(e))
});

module.exports = router;
