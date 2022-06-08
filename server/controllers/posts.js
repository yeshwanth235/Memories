import  mongoose  from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        console.log(`In get post ${postMessage}`);  
        res.status(200).json(postMessage)  
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error.message)
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error){
        res.statut(409).json({message: error.message})
        console.log(error.message)
    }
    // res.send('Post Creation')
}

export const updatePost = async (req, res) => {
    const { id} =req.params;
    const post = req.body;
    console.log("updatedPost in server/controllers/posts")
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id')
    }
    // {...post, _id}
    // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    const updatedPost = await PostMessage.findByIdAndUpdate({_id: id}, {...post,_id: id}, { new: true })
    console.log(updatedPost)
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id')
    }
    console.log('delete')
    await PostMessage.findByIdAndDelete({_id: id})
    res.json({message: 'Post deleted Successfully'})
}

export const likePost = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id')
    }
    console.log('likepost')
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})

    res.json(updatedPost)
}