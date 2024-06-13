const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {

        "busName":{type:String,required:true},
        "route":{type:String,required:true},
        "busNo":{type:String,required:true},
        "driverName":{type:String,required:true},

    }
)

let busModel = mongoose.model("bus",schema)
module.exports={busModel}