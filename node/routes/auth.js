const express = require('express');
const {validationResult, body} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router();
const authFunc = require('../middleware/auth');
const User = require('../model/User');
const {JWT_SECRET} = require('../config/config')

// adding authFunc as the second arg makes the route 'auth-protected'
// get user
router.get('/', authFunc, async (req, res) =>{
    try {
        //https://stackoverflow.com/questions/24348437/mongoose-select-a-specific-field-with-find
        const user = await User.findById(req.id).select({"password":0});
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "server error"});
    }
})

//login
router.post('/', [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
    ], async (req, res) =>{
    const results = await validationResult(req);
    if(!results.isEmpty()){
        console.log(results)
        return res.status(400).json({msg: "infomation not fulfilled",errors: results.errors})
    }
    console.log(req.body);
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email})
        if(!user){
            // exit early
            return res.status(400).json({msg: "user not exists"});
        }
        //https://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
        
        let result = await bcrypt.compare(password, user.password);
        if(!result) return res.status(400).json({msg: "invalid password"});

        const payload = {
            id:user.id
        }
        
        jwt.sign(
            payload, 
            JWT_SECRET, 
            {expiresIn: 88888}, 
            (err, token)=>{
                if(err) console.log(err);
                else res.json({token})}
            )

    }catch(e){
        console.log(e);
        res.status(400).json();
    }
})

module.exports = router;