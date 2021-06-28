import PostComments from '../models/postComments.js';
import mongoose from 'mongoose';

export const getComments = async (req, res) => {
    const id = req.params.id;
    // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with ID');
    const comments = await PostComments.find({"postId": id});
    res.status(200).json(comments);
}

export const addComment = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const {postId, userName, userId, comment} = req.body;
    const newComment = new PostComments({postId, userName, userId, comment, createdAt: new Date().toISOString()});

    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteComment = async (req, res) => {
    const {commentId, postId} = req.body;
    // if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No Post with ID');

    try {
        const response = await PostComments.deleteOne({postId: postId, _id: commentId});
        return res.status(200).json({count: response.deletedCount});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}