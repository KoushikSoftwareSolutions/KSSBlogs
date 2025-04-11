import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next) => {
    try{
        const token = req.cookies.auth;
        if(!token) return res.status(401).json({msg:"User not Logged in, please try to login"});
        const verifyJwt = jwt.verify(token,process.env.ACCESS_TOKEN);
        req.user = verifyJwt;
        if (!req.user.id) return res.status(401).json({ msg: "Invalid token" });
        next();
    }catch(e){
        console.log("Internal Server Error");
        return res.status(501).json({msg:"Internal Server Error"});
        
    }
}

export default authMiddleware;