const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const bcrypt = require("bcryptjs")
const connect = require("./connect/conn.js")
const route = require('./routes/auth')
app.use(express.json())
const User = require('./models/userSchema.js')
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/',route)

// app.get("/api/v1/employeelist",async (req,res)=>{
//     // const response = await Product.find()
//     // res.status(200).json({response})
//     try{
//         const employee = await User.find()
//         res.status(200).json({employee})
//     }catch(err){
//         res.status(404).json({msg:err.message})
//     }
// })  



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const start = async ()=>{
    try{
        await connect()
        app.listen(port,()=>{
            console.log(`i am at ${port}`)
        });
    }catch(error){
        console.log(error)
    }
};
start();



// {
//     "name":"abc",
//     "email":"test@gmail.com",
//     "password":"123456",
//     "confirmPassword":"123456"
//   }