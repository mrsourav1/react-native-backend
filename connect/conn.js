const mongoose = require("mongoose")

const connect = ()=>{
    mongoose.set('strictQuery', false)

    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Db is connected")
    })
}

module.exports = connect;
