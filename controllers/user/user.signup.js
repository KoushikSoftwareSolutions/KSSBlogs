import { UserData } from "../../lib/types.js";
import dbConnect from "../../db/db_connect.js";
import hashedPassword from "../../utils/hashedPassword.js";
import User from "../../models/user.model.js";
import storeJWT from "../../utils/user.jwt.js";

const signUp = async (req, res) => {
  await dbConnect();

  try {
    const email = req.body.email?.toLowerCase().trim();
    const { firstName, lastName, password, confirmPassword, avatar } = req.body;

    const missingFields = [];
    if (!firstName) missingFields.push("First Name");
    if (!lastName) missingFields.push("Last Name");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");
    if (!confirmPassword) missingFields.push("Confirm Password");

    if (missingFields.length > 0) {
      return res.status(400).json({
        msg: "Missing required fields",
        missingFields,
        status: false,
      });
    }

    const createPayLoad = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    const parsePayLoad = UserData.safeParse(createPayLoad);
    if (!parsePayLoad.success) {
      return res.status(400).json({
        msg: parsePayLoad.error.errors.map((e) => e.message).join(", "),
        status: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: "Passwords do not match",
        status: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists. Please log in instead.",
        status: false,
      });
    }

    const hashedPwd = await hashedPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPwd,
      avatar,
    });

    await newUser.save();

    storeJWT(req, res, newUser._id, newUser.email);

    return res.status(201).json({
      msg: "User registered successfully",
      status: true,
    });
  } catch (e) {
    console.error("Signup Error:", e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: false,
    });
  }
};

export default signUp;
