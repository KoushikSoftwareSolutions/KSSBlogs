import dbConnect from "../../db/db_connect.js"
import dotenv from "dotenv"
import User from "../../models/user.model.js";

dotenv.config();
const update = async (req,res) => {
    try{
        await dbConnect();
        const {firstName,lastName,avatar} = req.body;

        if(!firstName || !lastName) return res.status(400).json({msg:"Fields cannot be empty"});

        const updateData = await User.findByIdAndUpdate(req.user.id,{firstName,lastName,avatar},{new:true});
        if (!updateData) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({msg:"User Data Updated Successfully"})
    
    }catch(e){
        console.log("Internal Server error");
        return res.status(501).json({msg:"Internal Server Error"});
    }
}

export default update;