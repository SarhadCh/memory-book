import React, {useState} from 'react';
import useStyles from './styles'; 
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

import moment from 'moment';
import { deletePost, likePost } from '../../../actions/posts';
import {useDispatch} from 'react-redux';


const Post = ({post, setCurrentId, setOverlay, setPost}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const userDetails = JSON.parse(localStorage.getItem('profile'));
    const userId = userDetails?.result?._id;
    const idx = post?.likes?.findIndex(id => id===userId);
    const creatorId = post?.creator;

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    }

    const handleLike = () => {
        dispatch(likePost(post._id));
    }

    const handleComment = () => {
        setOverlay(true);
        setPost(post);
    }

    //  LIKE BUTTON
    const Like = () => {
        return (
            <Button size="small" color="primary" onClick={handleLike} disabled={!userId}>
                {idx==-1 ? (<ThumbUpAltOutlinedIcon fontSize="small" />) : (<ThumbUpAltIcon fontSize="small" />)}
                {`${idx==-1? 'Like' : ''} ${post?.likes.length}`}
            </Button> 
        )
    }

    // DELETE BUTTON
    const Delete = () => {
        return (
            <Button size="small" color="secondary" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
                Delete
            </Button>
        )
    }

    // COMMENT BUTTON
    const Comment = () => {
        return (
            <Button size="small" color="primary" onClick={handleComment}>
                <ChatBubbleOutlineOutlinedIcon fontSize="small" />
            </Button>
        )
    }
    
    return (
        <>
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {/* Edit Button */}
            {userId===creatorId && (
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size='small' onClick={()=>{setCurrentId(post._id)}}>
                        <EditOutlinedIcon fontSize='default' />
                    </Button>
                </div>
            )}

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map(t => `#${t} `)}</Typography>
            </div>

            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography variant='subtitle1' gutterBottom>{post.message}</Typography>
            </CardContent>
            

            {/* Like and Delete Buttons */}
            <CardActions className={classes.cardActions}>
                <Like />
                <Comment />
                {userId===creatorId && <Delete />}
            </CardActions>
        </Card>
        </>
    )
}

export default Post;
