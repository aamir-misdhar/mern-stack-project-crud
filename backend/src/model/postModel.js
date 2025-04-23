import mongoose, { Types } from "mongoose";

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
    },
    { timestamps: true }
);


const Post = mongoose.model("Post", postSchema);

export default Post;