const express= require('express');
const router = express.Router();
const Pin = require('../models/pin');
const User = require('../models/user');


//PINS
router.post('/pin', (req, res, next) => {
  Pin.create(req.body).then(pin =>{
    res.send(pin)
  }).catch(next)
})
router.get('/pin', (req, res, next) => {
  Pin.find({}).then(result => {
    res.send(result)
  }).catch(next)
})
router.get('/pin/:id', (req, res, next) => {
  console.log(req.params.id);
  Pin.find({creator_id: req.params.id})
  .then(result => res.send(result)).catch(next)
})
router.put('/pin/:id', (req, res ,next) => {
  Pin.findOne({_id: req.params.id}).then((pin)=>{
    // if is in who delete and vote down else vote up
    let votes = pin.votes;
    if(pin.who.indexOf(req.body.user) === -1){
      pin.who.push(req.body.user)
      pin.votes = votes +1
      console.log(pin.votes);
      pin.save()
      res.send(pin)
    }else{
      pin.who = pin.who.filter(id => id != req.body.user)
      pin.votes = votes -1
      console.log(pin.votes);

      pin.save()
      res.send(pin)
    }
  })

})
// delete pins
router.delete('/pin/:id', function(req, res, next){
  console.log(req.params.id);
  Pin.findByIdAndRemove({_id: req.params.id}).then(function(del){
    res.send(del);
  }).catch(next);
})


//User
router.get('/user/:id', (req, res, next) => {
  User.findOne({id: req.params.id}).then((result) =>{
    if(!result){
      res.status(404);
      res.send("no User")
    }
    else{
      res.send(result)
    }
  }).catch(next)
})

router.post('/user', (req, res, next) => {
  User.create(req.body).then((user) =>{
    res.send(user)
  }).catch(next)
})

router.put('/user/:id', (req, res, next) =>{
  console.log(req.params.id);
  User.findOneAndUpdate({id: req.params.id},
    {$set: {
      name: req.body.name,
      img: req.body.img
     }
   }).then(user => res.send(user))
})


// can come in handy

router.put('/test_res', function(req, res, next){
 Comments.findOne(
    {
    comments: {$elemMatch: {_id: req.body.comment_id}}
  }
  ).then(function(data){
    var comment_id = req.body.comment_id;
    var response_id = req.body.response_id;
    var modify = req.body.modify;
    data.comments.forEach(function(elem){
      if(elem._id == comment_id){
        if(req.body.response_id === undefined){
          elem.vote = req.body.vote;
          elem.up = req.body.up;
          elem.down = req.body.down
        }else{
          elem.response.forEach(function(response){
            if(response._id == response_id){
              response.vote = req.body.vote
              response.up= req.body.up
              response.down=req.body.down
            }
          })
        }
      }
    })
    data.save()
    res.end()
  }).catch(next)

})
module.exports = router;
