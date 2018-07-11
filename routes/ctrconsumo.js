const router = require("express").Router();
const CtrConsumo = require("../models/CentroConsumo");

router.post('/new',(req,res, next)=>{
  CtrConsumo.create(req.body)
  .then(centro=>{
      res.json(centro)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  CtrConsumo.find()
  .then(centros=>{
      res.json(centros);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
module.exports = router;
