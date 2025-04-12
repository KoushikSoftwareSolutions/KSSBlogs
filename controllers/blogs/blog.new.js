import dbConnect from "../../db/db_connect.js";
import Blog from "../../models/blog.model.js";

const addNewBlog = async (req, res) => {
    try {
        await dbConnect();
        const { image, title, shortDescription, category, content } = req.body;

        if (!image || !title || !shortDescription || !category) return res.status(400).json({ msg: "Fields Cannot Be Empty" });

        const blog = await Blog({ image, title, shortDescription, category, content })

        if (!blog) return res.status(400).json({ msg: "An Error Occurred" });

        await blog.save();

        res.status(200).json({ msg: "Blog Added Successfully" });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ msg: "Server error" });
    }
}
export default addNewBlog;