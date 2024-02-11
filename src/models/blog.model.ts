import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a Title"],
        },
        content: [
            {
                type: String,
            },
        ],
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
        cover: {
            url: String,
            public_id: String,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default Blog;
