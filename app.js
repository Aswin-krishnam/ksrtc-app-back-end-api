const express = require ("express")
const cors = require("cors")
const mongoos = require("mongoose")
const bcrypt = require("bcryptjs")

const { userModel } = require("./models/user")
mongoos.connect("mongodb+srv://aswinkrishnam16:aswinkrishnam@cluster0.2iu51vz.mongodb.net/ksrtcDB?retryWrites=true&w=majority&appName=Cluster0")

let app=express()
app.use(cors())
app.use(express.json())

//Evcryption
const generateHashedPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

app.post("/signup",async (req,res)=>{
    let input = req.body

    let hashedPassword = await generateHashedPassword(input.password)
    input.password=hashedPassword
    let blog = new userModel(input)
    blog.save()


    res.json({"status":"success"})
})
app.listen(8080,()=>{
    console.log("Server Running")
})