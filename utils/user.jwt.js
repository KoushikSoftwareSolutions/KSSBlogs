import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const storeJWT = (req, res, id, email) => {
  try {
    const token = jwt.sign(
      { id, email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "7d" } 
    );
    res.cookie("auth", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "None", 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
  } catch (e) {
    console.error("JWT Store Error:", e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default storeJWT;
