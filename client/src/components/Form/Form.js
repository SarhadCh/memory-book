import React, { useState, useEffect }from 'react';
import useStyles from './styles'; 
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import { createPost, updatePost } from '../../actions/posts';

const nullPost = { title: '', message: '', tags: '', selectedFile: ''};

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector(state => currentId? state.posts.find((p) => p._id === currentId) : null);
    const [postData, setPostData] = useState(nullPost);
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!currentId) {
            dispatch(createPost({ ...postData, name: user?.result?.name}));
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
        } 
        
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData(nullPost);
    }

    if(!user?.result?.name) return (
        <Paper className={classes.paper}>
            <Typography variant='h6' align='center' onClick={() => history.push("/auth")}>
                Please login/create account to share your memories!
            </Typography>
        </Paper>
    )
    
    return (
        <Paper className={classes.paper} elevation={3}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'> {currentId? 'Edit' : 'Create'} a Memory </Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})}/>
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={e => setPostData({...postData, message: e.target.value})}/>
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={e => setPostData({...postData, tags: e.target.value.split(",")})}/>
                
                <div className={classes.fileInput}> 
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                </div>

                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth> Submit </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth> Clear </Button>
            </form>
        </Paper>
    )
}

export default Form;
