const mongoose = require('mongoose');
const dburl = "mongodb://localhost:27017/mydb"
mongoose.set("strictQuery",false)
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => alert(err))

let sch = mongoose.Schema({
    username: String,
    password: String,
    role: String
})

let mongoconnect=mongoose.model("users",sch)

module.exports = mongoconnect