import dbConnect from "../../db/db_connect.js";
import Blog from "../../models/blog.model.js";

const getBlogCategory = async (req, res) => {
  try {
    await dbConnect();
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ msg: "Category is required" });
    }

    const blogs = await Blog.find({ category: category });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ msg: "No blogs found for this category" });
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export default getBlogCategory;
