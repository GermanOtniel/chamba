const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const CtrCons = require("../models/CentroConsumo");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get("/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/google/callback", passport.authenticate("google"),(req,res)=>{
  return res.json(req.user)
});
router.post('/signup', (req,res)=>{
  User.register(req.body, req.body.password, function(err, user) {
      if (err) return res.json(err);
        res.json(user);
      })
});
router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  return res.json(req.user);
});
router.get('/profile/:id' ,(req,res)=>{
  User.findById(req.params.id)
  .then(user=>{
    res.json(user);
  })
});
router.post('/profile/:id',(req,res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(user=>{
    console.log(req.body.centroConsumo._id)
    CtrCons.findByIdAndUpdate(req.body.centroConsumo._id,{
      $push: { usuarios: user._id }
    },{ 'new': true})
    .then(ctr=>{
      console.log(ctr)
    })
    .catch(e=>console.log(e))
      res.json(user);
  })
  .catch(e=>next(e));
});
module.exports = router;
