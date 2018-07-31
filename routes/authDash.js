const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

router.post('/signup', (req,res)=>{
  User.register(req.body, req.body.password, function(err, user) {
      if (err) return res.json(err);
        res.json(user);
      })
});
router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  return res.json(req.user);
});
router.get('/logout' ,(req,res)=>{
  req.logout();
  res.status(200);
  res.send('Sesión finalizada')
})
router.get('/profile/:id' ,(req,res)=>{
  User.findById(req.params.id)
  .populate('centroConsumo','nombre')
  .then(user=>{
    res.json(user);
  })
});
router.post('/user/:id',(req,res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(user=>{
    res.json(user);
  })
  .catch(e=>next(e));
});
router.get('/logout' ,(req,res)=>{
  req.logout();
  res.status(200);
  res.send('Sesión finalizada')
})

module.exports = router;