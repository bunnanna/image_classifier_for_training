const { promiseImpl } = require("ejs")
const express = require("express")
const router = express.Router()
const path = require("path")
const mongo = require('../model/mongo')
let chk = null
const cookie_time = 10*60*1000

router.get("/", (req, res) => {
    if (req.cookies.login) {
        res.render("../views/home.ejs", { role: req.cookies.userrole,name:req.cookies.username })
    } else {
        res.render("../views/login.ejs", { role: null, chk: chk })
    }

})

router.post("/login", (req, res) => {
    const idpw = req.body
    mongo.findOne({ username: idpw.UserId }).then((doc) => {
        if (idpw.password === doc.password) {
                res.cookie("userrole", doc.role, { maxAge:cookie_time})
                res.cookie("login", true, { maxAge:cookie_time})
                res.cookie("username", doc.username, { maxAge:cookie_time})
                chk = null
        } else {
            chk = "Wrong password Try again"
        }
        res.redirect("/")
    }
    ).catch((err) => {
        chk = "Does't found This ID"
        res.redirect("/")
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("userrole")
    res.clearCookie("login")
    res.clearCookie("username")
    chk = null
    res.redirect("/")
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