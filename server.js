const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// For the controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//connection to posgreSQL DB
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'B.ingaa01',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(bodyParser.json()); // Needed to return data rather than strings in the URL
app.use(cors());

/***************** Routes for Server Endpoints*******************/
// Gets root URL
app.get('/', (req, res) => {
    res.send(db.users)
})
// For the sigin POST request
app.post('/signin', (req, res) => 
    {signin.handleSignin(req, res, db, bcrypt) 
})
// For the Register Post Request 
app.post('/register', (req, res) => 
    {register.handleRegister(req, res, db, bcrypt)
})
// not used but will be developed for a profile page 
app.get('/profile/:id', (req, res) => 
    {profile.handleProfileGet(req, res, db)
});
 // allows increment of image entries 
app.put('/image', (req, res) => 
    {image.handleImage(req, res, db)
});
 // allows increment of image entries 
 app.post('/imageurl', (req, res) => 
    {image.handleApiCall(req, res)
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app running in port ${process.env.PORT}`);
  });
 

