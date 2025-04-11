import dbConnect from "../../db/db_connect.js";
import User from "../../models/user.model.js";

const profile = async (req, res) => {
    try {
        await dbConnect();

        const userProfile = await User.findById(req.user.id);
        if (!userProfile) {
            return res.status(404).json({ success: false, msg: "User Not Found" });
        }

        return res.status(200).json({ success: true, data: userProfile });
    } catch (e) {
        console.error("Error fetching profile:", e.message); 
        return res.status(500).json({ success: false, msg: "Internal Server Error", error: e.message });
    }
};
export default profile;
