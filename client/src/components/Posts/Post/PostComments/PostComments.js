import React, {useState, useEffect} from 'react';
import { TextField, Card, Grid, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

import useStyles from "./styles";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';

function PostComments({post}) {
    const classes = useStyles();
    let [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        const fetchComments = async () => {
            if(post._id) {
                const res = await axios.get(`http://localhost:5000/comments/${post._id}`);
                setComments(res.data);
            }
        }

        fetchComments();
    }, [post, count]);

    const submitComment = async (e) => {
        if(comment.length == 0) return;
        const postId = post._id;
        const userName = user?.result?.name;
        const userId = user?.result?._id;

        axios.patch(`http://localhost:5000/comments/addComment/${post._id}`, {postId, userName, userId, comment})
            .then(res => {
                setCount(count => count+1);
                e.target.value('');
            }).catch(err => {
                console.log(err);
            })
    }

    const deleteComment = async (comment) => {
        const commentId = comment._id;
        const res = await axios.patch(`http://localhost:5000/comments/deleteComment/`, {commentId, postId: post._id});
        
        if(res.data.count === 1) {
            setComments(comments => comments.filter(comment => comment._id!=commentId));
        }
    }

    const Comment = ({comment})=> {
        const userId = user?.result?._id;

        return (
            <div className={classes.singleComment}>
            <Grid container direction="row" justify="space-between">
                <Grid item>
                    <Typography variant='body1' align='left'>
                        <b>{comment.userName}</b> {comment.comment}
                    </Typography>
                    
                </Grid>
                <Grid item>
                    {
                    (userId==comment.userId) && (
                        <Button size="small" color="secondary" onClick={() => deleteComment(comment)}>
                            <DeleteIcon fontSize="small" />
                        </Button>
                    )
                    }
                </Grid>
            </Grid>
            </div>
        )
    }

    return (
    <>
        <Grid container direction="column" spacing={2}>
        <div className={classes.commentBox}>
            <Grid container justify="space-between">
            {
                user && (
                <>
                <Grid item> 
                    <TextField  variant="outlined" fullWidth label="Enter comment" 
                        name="userComment" onChange={e => setComment(e.target.value)}
                    />
                </Grid>

                <Grid item> 
                    <Button size="medium" color="primary" onClick={submitComment}>
                        <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                    </Button>
                </Grid>
                </>
                )
            }
            </Grid>
        </div>

        {
            comments?.map(comment => {
                return <Comment comment={comment}/>
            })
        }  
        </Grid>
    </>
    )
}

export default PostComments


