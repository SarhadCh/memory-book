import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with ID');
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post, _id: id}, {new: true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with ID');

    await PostMessage.findByIdAndDelete(id);
    res.status(201).json({message: 'deletion success'});
}


export const likePost = async (req, res) => {
    const id = req.params.id;
    if(!req.userId) return res.json({message: 'Unauthenticated'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with ID');

    const post = await PostMessage.findById(id);
    const uID = String(req.userId); 

    // find whether the current user has already liked the post or not::
    const index = post.likes.findIndex(id => id===uID);

    if(index===-1) {
        post.likes.push(uID);
    } else {
        post.likes = post.likes.filter(id => id!=uID);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);
}