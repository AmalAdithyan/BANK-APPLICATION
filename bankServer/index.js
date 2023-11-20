//import
const dataService = require('./service/dataservice')

//import cors
const cors =require("cors")

//import json web token
const jwt = require('jsonwebtoken')
//import express
const express = require("express")

//create app using express
const app = express();

//connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))




app.use(express.json());
//register ----------   
//login             | 
//deposit            } this are all the api request we can expect from cliet/front end
//withdraw          | 
//getTransaction    | 
//delete-------------


const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers['access_token']
    //verify token
    const data = jwt.verify(token, "supersecretkey123")
    console.log("-------middleware-------")
    console.log(data);
    next()
  }
  catch {
    res.status(422).json({
      statusCode: 422,
      status: false,
      message: 'please login first'
    })
  }
}

//REGISTER--POST
app.post('/register', (req, res) => {
  dataService.register(req.body.uname, req.body.acno, req.body.psw).then(result => {
    res.status(result.statusCode).json(result)
  })
  /*thazhathe if-ine pakaram jusr ee line mathram, mathi ennit ith 
  store cheythitula const result jsonilek convert cheyth response koduthal mathi */
  //  if (result) {------------------------\
  //    res.send("registered")              \        
  // }                                       \ ivide ini ithinde avisyam illa data serivicine varuna result direct print cheyth kanichal mathi
  //else {                                   /
  //  res.send("user already exist")        /
  //}--------------------------------------/
  // res.status(result.statusCode).json(result) // this converts js file to json so response could be read by fronend
  // status(result.statusCode) --what this does is changes or shows the status in thunder cliend or frontend
})

//LOGIN --
app.post('/login', (req, res) => {
  dataService.login(req.body.acno, req.body.psw).then(result => {
    res.status(result.statusCode).json(result);
  })

});

//DEPOSIT
app.post('/deposit', jwtMiddleware, (req, res) => {
  dataService.deposit(req.body.acnum, req.body.password, req.body.amount).then(result => {
    res.status(result.statusCode).json(result)
  })
})

//WITHDRAW

app.post('/withdraw', jwtMiddleware, (req, res) => {
  const result = dataService.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result => {
    res.status(result.statusCode).json(result)
  })
})

// GET TRANSACTION

app.post('/transaction', jwtMiddleware, (req, res) => {
  dataService.transaction(req.body.acno).then(result => {
    res.status(result.statusCode).json(result);
  })

});

//DELETE
app.delete('/delete/:acno',jwtMiddleware,(req,res)=>{
  dataService.deleteAcc(req.params.acno).then(result=>{
res.status(result.statusCode).json(result)
  })
})


//create port
app.listen(3000, () => { console.log("server started at port number 3000"); })

/*
//request
app.get('/',(req,res)=>{
  res.send('Get Method .....asddsf')
})
app.put('/',(req,res)=>{
  res.send('Put Method .....123fggfd')
})
app.patch('/',(req,res)=>{
  res.send('Patch Method .....123fggfd')
})
app.post('/',(req,res)=>{
  res.send('post Method .....123fggfd')
})
app.delete('/',(req,res)=>{
  res.send('delete Method .....123fggfd')
})*/
