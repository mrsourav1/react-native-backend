const User = require('../models/userSchema.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register =  async (req, res) => {
    let userExist = await User.findOne({ "email": req.body.email });
    console.log(userExist)
    if (userExist) {
        
        res.status(401).json("already exist");
        return;
    }
    if ((req.body.mobile).toString().length !== 10){
        res.status(401).json("Mobile should be of length 10")
        return;
    }
    let hashPassword = await bcrypt.hash(req.body.password, 10);
        if (req.body.password == req.body.confirmPassword) {
            let response = new User({
                name: req.body.name,
                email: req.body.email,
                mobile:req.body.mobile,
                password: hashPassword,
                confirmPassword: hashPassword
            })
            await response.save()
            res.status(201).json(response)
        }else{
        res.status(400).json("password not match");
            
        }
    }

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({msg: "User does not exist"});
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token= jwt.sign({ id:user._id },"secret1233");
        delete user.password;
        res.status(200).json({token,user});
        console.log(token)
    }catch(err){
        res.status(500).json({ error:err.message })
        console.log(err)
    }
}

const edit = async(req,res)=>{
    try{
        const _id = req.params.id;
        const editUser = await User.findByIdAndUpdate(_id,req.body)
        res.status(200).json({editUser})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const employeesList = async(req,res)=>{
    try{
        const employee = await User.find()
        res.status(200).json({employee})
    }catch(err){
        res.status(404).json({msg:err.message})
    }
}

module.exports = {register,login,edit,employeesList};