const router = require("express").Router();
const Brand = require("../models/Brand");

router.post('/new',(req,res, next)=>{
  Brand.create(req.body)
  .then(brand=>{
      res.json(brand)
  })
  .catch(e=>next(e))
});
router.get('/',(req,res,next)=>{
  Brand.find()
  .then(brands=>{
      res.json(brands);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
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
