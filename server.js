const express = require('express');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Components/register');
const signin = require('./Components/signin');
const image = require('./Components/image');
const profile = require('./Components/profile');


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.send('it is working')})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) =>{profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageURL', (req, res) => { register.handleAPIcall(req, res)})



app.listen(process.env.PORT || 3000, ()=>{
console.log(`app is running on port ${process.env.PORT}`);
})