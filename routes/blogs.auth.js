import express from "express"
import addNewBlog from "../controllers/blogs/blog.new.js"
import getAllBlogs from "../controllers/blogs/blog.blogs.js";
import getBlog from "../controllers/blogs/blog.blog.js";
import getBlogCategory from "../controllers/blogs/blog.category.js";

const blogRouter = express.Router()

blogRouter.post("/post-blog",addNewBlog);
blogRouter.get("/blogs",getAllBlogs);
blogRouter.get("/:id",getBlog)
blogRouter.get("/category/:category",getBlogCategory)
export default blogRouter;