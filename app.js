const express = require ("express")
const cors = require("cors")
const mongoos = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

app.post("/signin", (req,res)=>{
    let input = req.body
    userModel.find({"email":req.body.email}).then(
        (response)=>{
            if (response.length>0) {
                let dbPassword=response[0].password
                bcrypt.compare(input.password,dbPassword,(error,isMatch)=>{
                    if (isMatch) {
                        
                        jwt.sign({email:input.email},"blog-app",{expiresIn:"1d"},(error,token)=>{
                            if (error) {
                                res.json({"status":"unable to create a token"})
                                
                            } else {
                                res.json({"status":"success","userId":response[0]._id,"token":token})
                            }
                        })

                    } else {
                        res.json({"status":"Password incorrect"})
                    }
                })
            } else {
                res.json({"status":"User not found"})
            }
        }
    ).catch()

})

app.listen(8080,()=>{
    console.log("Server Running")
})