//imports modules
const express = require('express')
let mongodb = require('mongodb')


//create mongo client
let mcl = mongodb.MongoClient

//create router instance
var router = express.Router()

//import url
let url = require("../url")

//create rest api
router.get("/authuser",(req,res) =>{
    mcl.connect(url,(err,conn)=>{
        if(err)
        {
            console.log("Errorin connection :-",err)
        }
        else{
            let db = conn.db("blog")
            db.collection("users").find().toArray((err,array)=>{
                if(err)
                {
                    console.log("Error while fetching data :- ",err)

                }
                else{
                    console.log("Data Sent")
                    res.send(array)
                }
            })
        }
    })

})
//export router
module.exports = router