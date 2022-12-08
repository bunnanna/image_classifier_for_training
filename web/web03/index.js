const http = require('http');
const fs = require("fs");
const url = require('url')
const express = require("express")
const router = require("./router/router")
const ejs = require("ejs")
const app = express()
const path = require("path")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true })); 
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"./views"))
app.use(express.static(path.join(__dirname,"./public")))

app.use(router)

app.listen(3000,()=>{
    console.log("started")
})





// console.log('Current directory: ' + process.cwd());

// const server = http.createServer((req,res)=>{
//     if (req.url ==="/home"){
//         res.end(fs.readFileSync(`${__dirname}\\webpage\\home.html`,"utf-8"))
//     }else{
//         res.end(web)
//     }
// })
// server.listen(3000,()=>{
//     console.log("started")
// })