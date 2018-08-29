const router = require("express").Router();
const transporter = require('../helpers/nodemailer');
const User = require("../models/User");


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

router.get('/:id' ,(req,res)=>{
  User.findByIdAndUpdate(req.params.id, {$set: { cuentaConfirmada:true } }, { 'new':true } )
  .then(r=>{
    res.render('profile')
  })
  .catch(e=>console.log(e))
});

module.exports = router;
