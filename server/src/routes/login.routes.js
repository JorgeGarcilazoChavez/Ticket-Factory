import express from "express";
const routerLogin = express.Router();
import { User } from "../models/User.js";

// Login STATE
const loggedInUsers = []

// LOGIN LOGIC

routerLogin.post('/', async (req, res)=>{
    const emailLogin = req.body.email
    const passwordLogin = req.body.password
    const userInfo = await User.findOne({
        where: {email: emailLogin}
    })

    if(userInfo){
        console.log(`Found USER! ${userInfo}` )
        if(passwordLogin === userInfo.password){
            loggedInUsers.push(userInfo)
            res.status(200).send()
        } else {
            console.log('Invalid credentials')
        }
    } else {
        console.log('User not found')
    }
})

export default routerLogin