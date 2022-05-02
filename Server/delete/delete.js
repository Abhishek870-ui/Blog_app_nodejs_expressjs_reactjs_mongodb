//import modules
const express = require('express')
let mongodb = require('mongodb')
//create mongo client
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//import url
let url = require("../url")
//create rest api
router.post("/",(req,res)=>{
    let p_id = req.body.p_id
    
    let obj = {
        "p_id" : p_id,
        
    }
    mcl.connect(url,(err,conn)=>{
        if(err)
        {
            console.log("Error in connection :- ",err)

        }
        else{
            let db = conn.db("nodedb")
            db.collection("products").deleteOne(obj,(err)=>{
                if(err){
                    res.json({'deleted' : 'failed'})
                }
                else{
                    console.log("Data deleted")
                    res.json({'deleted' : 'success'})
                }
            })

        }
    })
})
//export router
module.exports = router