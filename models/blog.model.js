import mongoose from "mongoose"

const ContentSchema = new mongoose.Schema({
    image : String,
    heading:String,
    subHeading:String,
    content : String
})

const BlogSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    shortDescription : {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    content : [ContentSchema]
},{
    timestamps : true
})

const Blog = mongoose.model("BLOG",BlogSchema);

export default Blog;