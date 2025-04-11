import dotenv from "dotenv";
import dbConnect from "../../db/db_connect.js";
import User from "../../models/user.model.js";

dotenv.config();

const deleteUser = async (req, res) => {
  try {
    await dbConnect();

    const deletedUser = await User.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return res.status(400).json({
        msg: "Failed to delete user. User not found!",
        status: false,
      });
    }

    res.clearCookie("auth", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({
      msg: "Successfully deleted user data",
      status: true,
    });

  } catch (e) {
    console.error("Delete User Error:", e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: false,
    });
  }
};

export default deleteUser;
