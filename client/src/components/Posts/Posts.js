import React, { useState, useEffect } from 'react'; 
import Post from './Post/Post';
import useStyles from './styles'; 
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';

import Overlay from "react-overlay-component";
import PostComments from "./Post/PostComments/PostComments";

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);
    const [post, setPost] = useState({});

    // showing the comment section as an overlay
    const [overlay, setOverlay] = useState(false);
    const closeOverlay = () => setOverlay(false);
    
    const configs = {
        animate: true,
        // clickDismiss: false,
        // escapeDismiss: false,
        // focusOutline: false,
    };
    
    return (
        !posts.length? <CircularProgress /> : (
            <>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                { 
                    posts.map(post => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post setCurrentId={setCurrentId} post={post} setOverlay={setOverlay} setPost={setPost}/>
                        </Grid>     
                    ))
                }
            </Grid>

            <Overlay configs={configs} isOpen={overlay} closeOverlay={closeOverlay} className={classes.comments}>
                <PostComments post={post}/>
            </Overlay>
            </>
        )
    )
}

export default Posts;
