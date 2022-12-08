const express = require("express")
const router = express.Router()
const path = require("path")
const mongo = require('../model/mongo')
let chk=null

router.get("/", (req, res) => {
    res.render("../views/login.ejs",{chk})
})

router.post("/login", (req, res) => {
    const idpw = req.body
    mongo.findOne({ username: idpw.UserId }).then((doc) => {
            if (idpw.password === doc.password) {
                res.cookie("userrole",doc.role,{maxAge:10*60*1000})
                res.cookie("login",true)
                chk=null
                res.render("../views/home.ejs")
            } else {
                chk="Wrong password Try again"
                res.redirect("/")
            }
        }
    ).catch((err)=>{
        chk="Does't found This ID"
        res.redirect("/")})
})

// const basepath =path.join(__dirname,"..\\webpage")

// router.get("/",(req,res)=>{
//     res.sendFile(path.join(basepath,"login.html"))
// })

// router.post("/home",(req,res)=>{
//     console.log(req.body.UserId)
//     res.sendFile(path.join(basepath,"home.html"))
// })

module.exports = router