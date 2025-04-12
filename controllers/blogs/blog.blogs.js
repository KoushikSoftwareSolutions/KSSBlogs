import dbConnect from "../../db/db_connect.js";
import Blog from "../../models/blog.model.js";

const getAllBlogs = async (req, res) => {
    try {
        await dbConnect();

        const blogs = await Blog.find(); // Correct: Fetch all blogs

        res.status(200).json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};

export default getAllBlogs;
