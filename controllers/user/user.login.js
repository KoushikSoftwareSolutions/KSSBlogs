import { UserLoginData } from "../../lib/types.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import storeJWT from "../../utils/user.jwt.js";
import dbConnect from "../../db/db_connect.js";

const login = async (req, res) => {
  await dbConnect();

  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;

    const createPayload = { email, password };
    const parsePayLoad = UserLoginData.safeParse(createPayload);

    if (!parsePayLoad.success) {
      return res.status(400).json({
        msg: parsePayLoad.error.errors.map((e) => e.message).join(", "),
        status: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "User not found. Please register.",
        status: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid credentials",
        status: false,
      });
    }

    storeJWT(req, res, user._id, email);

    return res.status(200).json({
      msg: "User logged in successfully",
      status: true,
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: false,
    });
  }
};

export default login;
