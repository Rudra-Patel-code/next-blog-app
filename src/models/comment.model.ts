import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, "Comment cannot be empty"],
        },
        blogId: {
            type: mongoose.Types.ObjectId,
            ref: "blogs",
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const Comment =
    mongoose.models.comments || mongoose.model("comments", commentSchema);

export default Comment;
