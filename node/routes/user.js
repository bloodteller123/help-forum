const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs')
//https://stackoverflow.com/questions/70637379/best-practice-to-validate-post-request-body
const {validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../model/User')
const {JWT_SECRET} = require('../config/config')
// register user
router.post('/', [
    body('name').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
    ], async (req, res) =>{
    const results = await validationResult(req);
    if(!results.isEmpty()){
        console.log(results)
        return res.status(400).json({msg: "infomation not fulfilled",errors: results.errors})
    }

    console.log(req.body);
    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email})
        if(user){
            // exit early
            return res.status(400).json({msg: "user exists"});
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(8);
        user.password = await bcrypt.hash(user.password, salt);
            
        await user.save();

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