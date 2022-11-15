const express = require ("express")
const mongoose = require ("mongoose")
const bodyparser = require ("body-parser")
const app = express ()
const cors = require('cors')


const {routeUser} = require('./route/userroute')
const {routePost} = require('./route/postroute')
const {routeReminder} = require('./route/reminderroute')
const { response } = require("express")


mongoose.connect('mongodb://localhost/basePfe',{ useNewUrlParser: true ,useUnifiedTopology: true} )
.then(()=>console.log("connected to mongodb"))
.catch(err=>{console.log('cannot connect to  mongodb')})

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use('/uploads', express.static(__dirname + '/uploads/'));


app.use(bodyparser.json())
app.use(cors('*'))
app.use('/user',routeUser)
app.use('/post',routePost)
app.use('/reminder',routeReminder)



app.listen(3000,'172.20.10.5',()=>{

    console.log("server 172.20.10.5 run at port 3000")
})





