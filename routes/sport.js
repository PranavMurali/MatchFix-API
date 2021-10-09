const express = require('express');
const Sport = require('../models/sport');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(`MatchFix API
  * This API can POST sports details such as name, description and Image for the sports offered at your university.
  * Your data can then be retrived from our Mongodb Atlas database and be used to populate your university's MatchFix website.
  * This API can also GET, Delete and PATCH any of the sports entries.
  * The GET search can be done using both sport entry ID and author name.
  * This API has to be locally hosted at your insitution while fine tuning MatchFix for your institution.`);
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