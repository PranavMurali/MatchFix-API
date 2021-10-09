const express = require('express');
const Sport = require('../models/sport');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send("MatchFix API");
});

router.get('/all', async (req, res) => {
  try{
      const sport = await Sport.find();
      res.json(sport);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

router.post('/', async (req, res) => {
  const sport = new Sport({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    author: req.body.author,
    created_at: new Date(),
    updated_at: new Date()
  });
  const Savedsport = await sport
  .save((err, sport) => {
    if (err) {
      res.send(err);
    }
    res.json(sport);
  });
});


router.get('/:id', async (req, res) => {
  try{
    const sport = await Sport.findById(req.params.id);
    res.json(sport);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

router.get('/user/:author', async (req, res) => {
  try{
    const sport = await Sport.find({author: req.params.author});
    res.json(sport);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const removedSport = await Sport.deleteOne({_id: req.params.id});
    res.json(removedSport);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

router.patch('/:id', async (req, res) => {
  try{
    const updatedSport = await Sport.updateOne(
      {_id: req.params.id},
      {$set: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        updated_at: new Date()
      }}
    );
    res.json(updatedSport);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

module.exports = router;