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

// RUTA PARA LA PAGINA WEB PARA QUE ESTA MANDE LOS DATOS DE UN INTERESADO AL CORREO DE DAN@1PUNTOCINCO.COM
router.post('/paginaweb' ,(req,res)=>{
  var nombre = req.body.name;
  var correo = req.body.email;
  var mensaje = req.body.message;
  var proposito = req.body.purpose;
  var destinatario = "dan@1puntocinco.com"
  var content = `Hola ${destinatario}, te paso el mensaje y los datos que dejo un cliente potencial en nuestra página web. \n 
  ¡No se te olvide mandarle mensaje de vuelta! \n 
  Correo: ${correo} \n
  Nombre: ${nombre} \n
  Asunto: ${proposito} \n
  Mensaje: ${mensaje}`

  var mail = {
    from: process.env.USER,
    to: destinatario,  //Change to email address that you want to receive messages on
    subject: 'Cliente Pagina Web:',
    text: content
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
        res.json({
          done:'done'
        })
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
