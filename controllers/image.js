// adds increments to users table for number of image posts
const Clarifai = require('clarifai');

// change to your own Clarifai API Key
const app = new Clarifai.App({
  apiKey: 'feea80639081462ebe354b9650b905b6'
 });

 const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}


const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.json('Unable to get entries'));
  }
  
  module.exports = {
    handleImage,
    handleApiCall
  }