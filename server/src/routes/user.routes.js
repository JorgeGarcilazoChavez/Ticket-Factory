import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
import { findAllUsers, findOneUser, createUser, deleteUser, findUserByEmail } from "../controllers/user.controller.js";
const routerUser = express.Router();

// Get requests
routerUser.get('/', async (req, res)=>{
    try{
        const users = await findAllUsers();
        return res.json(users)

    } catch (e){

        return res.status(500).json({ error: e.message });
    }
});

//Cookie refresher
routerUser.get('/me', async (req, res) => {
    try{
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({message: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        const user = await findUserByEmail(decoded.email);
        if(!user){
            return res.status(404).json({ message: 'User not found'});
        }

        const { password: _, ...userNoPassword} = user.toJSON();
        res.json(userNoPassword);
        
    } catch (err) {
        return res.status(401).json({message: 'Invalid token' });
    }
});


routerUser.get('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const user = await findOneUser(id)
        return res.json(user);

    } catch (e){

    return res.status(500).json({ error: e.message });
    
    }
});

// Post request

routerUser.post('/', async (req, res) => {
    try{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await createUser(firstName, lastName, email, hashPassword);
    console.log(newUser);
    
    const token = jwt.sign({ id: newUser.id, email: email }, process.env.SECRET_JWT_KEY, 
            {
                expiresIn: "1h"
            });

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge:1000 * 60 * 60, //Cookie lasts one hour
        }).json( newUser );

    } catch (e) {
        return res.status(500).json({ error: e.message });

    }
});

routerUser.post('/login', async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await findUserByEmail(email);
        if(!user){
           return res.status(404).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
           return res.status(401).json({message: "Invalid credentials"});
        }

        const { password: _, ...userNoPassword } = user.toJSON();

        const token = jwt.sign({ id: user.id, email: email }, process.env.SECRET_JWT_KEY, 
            {
                expiresIn: "1h"
            });

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge:1000 * 60 * 60, //Cookie lasts one hour
        }).send(userNoPassword);
    } catch (e){
        return res.status(500).json({error: e.message});
    }

})

// Delete request
routerUser.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedUser = await deleteUser(id);
        return res.json(deletedUser);
    } catch (e){
        return res.status(500).json({ error: e.message });
    }
});

//Logout
routerUser.post('/logout', (req, res) => {
    res.clearCookie('access_token').json({ message: 'Logged out' });
});

export default routerUser