const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'rahulganesh',
    password : '',
    database : 'smart-brain'
  }
});


const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')

app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res)=>{
  //added new response
	res.send("it is working")
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db, bcrypt)})

app.put('/image',  (req, res) => {image.handleImage(req, res, db)})



app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})
