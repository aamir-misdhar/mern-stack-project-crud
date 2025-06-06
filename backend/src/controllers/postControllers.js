import Post from '../model/postModel.js';


//GET POSTS
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).select('-__v');
        console.log(posts);
        res.status(200).json(posts);
    } catch {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}


//CREATE POST
const createPost = async (req, res) => {
    const { title, description } = req.body
    console.log(title);
    console.log(description);
    try {
        const post = await Post.create({ title, description })
        res.status(201).json({ message: "Post Created Successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }

}

//GET SINGLE POST
const getSinglePost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id).select("-__v");
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        res.status(200).json({ post });
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid post Id" })
        }
        res.status(500).json({ message: error.message })
    }
}

//PUT POST
const updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        // Update fields
        post.title = req.body.title || post.title;
        post.description = req.body.description || post.description;

        const updatedPost = await post.save();
        res.status(200).json({
            id: updatedPost._id,
            title: updatedPost.title,
            description: updatedPost.description,
        });
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid post Id" });
        }
        res.status(500).json({ message: error.message });
    }
};


//DELETE POST
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        res.status(200).json({ message: "Post Delelted Successfuly" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid post Id" });
        }
        res.status(500).json({ message: error.message });
    }
}

export { getPosts, createPost, getSinglePost, updatePost, deletePost }