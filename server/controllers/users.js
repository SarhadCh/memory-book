import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User doesnt exist"});
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!passwordCorrect) return res.status(404).send("User Not Found");

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "test", {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signup = async (req, res) => {
    const {firstName, secondName, email, password, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists"});
        if(password!=confirmPassword) return res.status(400).json({message:"Passwords dont match"});
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${secondName}`})
        const token = jwt.sign({email: result.email, id: result._id}, "test", {expiresIn: "1h"});

        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}