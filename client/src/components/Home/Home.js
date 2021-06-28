import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

function Home() {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(()=>{
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <div>
            <Grow in>
                <Container>
                    <Grid container justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Form setCurrentId={setCurrentId} currentId={currentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;
