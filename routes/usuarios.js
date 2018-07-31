const router = require("express").Router();
const User   = require("../models/User");

router.get('/',(req,res,next)=>{
  User.find()
  .then(usuarios=>{
      res.json(usuarios);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

module.exports = router;