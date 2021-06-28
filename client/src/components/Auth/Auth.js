import React, {useState, useEffect} from 'react';
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Avatar, Paper, Button, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles";
import { signup, signin } from "../../actions/auth";

import InputField from "./InputField";
import Icon from "./icon";

const initialState = {firstName: '', secondName: '', email: '', password: '', confirmPassword: ''};

function Auth() {
    const classes = useStyles(); 
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if(isSignup) {
            dispatch(signup(formData, history));
        } else {
            console.log(formData);
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
        setIsSignup(!isSignup);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: "AUTH", data: {result, token}});
            history.push("/");
        } catch(error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Sign in failed, try again");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={5}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5"> {isSignup? "Sign up" : "Sign In"} </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                            <>
                                <InputField name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <InputField name="secondName" label="Second Name" handleChange={handleChange} half/>
                            </>
                            )
                        }

                        <InputField name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <InputField name="password" label="Password" handleChange={handleChange} 
                            type={showPassword? "text" : "password"} handleShowPassword={handleShowPassword}/>

                        { isSignup && <InputField name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword? "text" : "password"} /> }   
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin 
                        clientId="687379758903-mj2ak7smbf2v6g2uslbkm78043k1m3ur.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant="contained"
                            > Google Login </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                    />

                    <Button onClick={switchMode} fullWidth variant="outlined" color="primary">
                        {isSignup? "Already a user? Login" : "Create a new account!"}
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
