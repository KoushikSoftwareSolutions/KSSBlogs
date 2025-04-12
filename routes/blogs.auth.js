import express from "express"
import addNewBlog from "../controllers/blogs/blog.new.js"
import getAllBlogs from "../controllers/blogs/blog.blogs.js";

const blogRouter = express.Router()

blogRouter.post("/post-blog",addNewBlog);
blogRouter.get("/blogs",getAllBlogs);

export default blogRouter;