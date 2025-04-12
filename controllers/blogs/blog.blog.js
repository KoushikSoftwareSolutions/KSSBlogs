import dbConnect from "../../db/db_connect.js";
import Blog from "../../models/blog.model.js";

const getBlog = async (req, res) => {
    try {
      await dbConnect();
      const id = req.params.id;
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return res.status(404).json({ msg: "No blogs found for this category" });
      }
  
      return res.status(200).json({ blog });
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  };
  
export default getBlog;
  
