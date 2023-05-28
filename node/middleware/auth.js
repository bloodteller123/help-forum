const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config')

const authfunc = (req, res, callback) =>{
    let token = req.header('Authorization');
    console.log(token)
    if(token){
        token = token.replace(/^Bearer\s+/, "");
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            // req.id can now be assessed in all auth-protected routes
            console.log(decoded)
            req.id = decoded.id;
            callback();
            return;
        } catch (error) {
            return res.status(401).json({msg: "token not valid"})
        }
    }
    res.status(401).json({msg: "Auth denied"});
}

module.exports = authfunc;