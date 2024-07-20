const User = require("../model/User")

const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
} 
module.exports={
    getAllUsers
}