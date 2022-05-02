//import modules
const express = require('express')
let mongodb = require('mongodb')
let multer = require("multer");
let jwt = require("jwt-simple")
var async = require('async');
const moment = require('moment')
//create mongo client
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//import url
let url = require("../url")

// upload image in specfic folder
let storage = multer.diskStorage({
    destination: function (req, image, cb) {
        cb(null, '../blogapp/public/uploads')
    },
    filename: function (req, image, cb) {
        cb(null, image.fieldname + '-' + Date.now() + '.jpg')
    }
})
let upload = multer({ storage: storage })


//create rest api


// insert user details
router.post("/registerUser", upload.single('image'), (req, res) => {
    let obj = req.body;
    console.log(obj)
    let fname = obj.fname;
    let lname = obj.lname;
    let email = obj.email;
    let phone = obj.phone;
    let gender = obj.gender;
    let password = obj.password;
    let token = obj.token;
    let image = ""
    if (req.file) {
        image = '../uploads' + '/' + req.file.filename;

    }

    
    console.log(req.file)

    let userdata = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "phone": phone,
        "gender": gender,
        "password": password,
        "token": token,
        "image": image,
        "created_at" : moment().format()
        
    }
    mcl.connect(url, (err, conn) => {
        if (err) {
            console.log("Error in connection :- ", err)

        }
        else {
            console.log("connected");
            let db = conn.db("blog")
            db.collection("users").insertOne(userdata, (err) => {
                if (err) {
                    console.log("insert error", err);
                }
                else {
                    console.log("data inserted ");
                    res.json({ "insert": "success" })
                }
            })
        }
    })

})



//export router
module.exports = router