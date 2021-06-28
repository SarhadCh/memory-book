import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar, AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import memories from "../../images/memories.png";
import useStyles from "./styles";

import { useDispatch } from 'react-redux';

function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
        history.push("/");
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className = {classes.heading} variant='h3' align = 'center'>MemoryBook</Typography>
                <img className = {classes.image} src={memories} alt='memories' height='60' />
            </div>

            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Login / Signup</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
