var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    secretOrPublicKey = 'padinet',
    token = jwt.sign({ name: 'padinet' }, secretOrPublicKey);;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.get('/',(req,res) => {
    console.log("Server run")
    res.send({message:'server run'})
})
app.get('/token',(req,res) => {
    console.log("Token",token)
    res.send(token)
})
app.get('/decoded/:token',(req,res) => {
    decoded = jwt.decode(req.params.token,{complete:true})
    console.log("Decoded",decoded)
    res.send(decoded)
})
app.get('/verify/:token',(req,res) => {
    verify = jwt.verify(req.params.token,secretOrPublicKey, (err,decoded) => {
        if(!err){
            console.log("Verify",decoded)
            res.send(decoded)
        }else{
            console.log("ERr",err)
            res.send(err)
        }
    })
})
app.listen(3000,() => {
    console.log("App run on port 3000")
})