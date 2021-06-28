import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    postId: String,
    userName: String,
    userId: String,
    comment: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const postComments = mongoose.model('PostComments', commentSchema);
export default postComments; 