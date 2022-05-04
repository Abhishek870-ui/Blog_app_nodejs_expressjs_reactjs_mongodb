//imports modules
const express = require('express')
let mongodb = require('mongodb')


//create mongo client
let mcl = mongodb.MongoClient

//create router instance
var router = express.Router()

//import url
let url = require("../url")

//import token
let token = require("../token/token")

//create rest api

//create rest api

//login api
router.post("/authuser", (req, res) => {
    let user={
       email : req.body.email,
       password : req.body.password   
    }
       // let uname = req.body.uname
       // let upwd = req.body.upwd   
  
      
   //compare with database
   mcl.connect(url, (err, conn) => {
       if (err)
           console.log("Error in connection:- ", err)
       else {
           let db = conn.db("blog")
           db.collection("users").findOne(user,(err, array) => {
               if(array.length != 0)
           {
               //var d = new Date();
               let myToken = {
                   token : token(user,JSON.stringify(new Date())) 
                 }
               db.collection("users").insertOne(myToken, (err) => {
                if (err) {
                    console.log("insert error", err);
                }
                else {
                    console.log("data inserted ");
                    res.json({ "insert": "success" })
                }
            })              
               res.send({'auth':'success', 'token':myToken})
             
           }
           else
           {
               res.send({'auth':'failed'})
           }
       })
       }
   })
   
})

//export router
module.exports = router