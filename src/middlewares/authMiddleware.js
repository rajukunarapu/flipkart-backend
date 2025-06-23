const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next)=>{
    try{
        const { token } = req.cookies;
        if(!token){
            throw new Error("invalid token")
        }
        const decoded = jwt.verify(token,`${process.env.JWT_SECRETE_KEY}`);
        req._id = decoded._id;
        next();
    }catch(error){
        console.log("Error : " +error.message)
        res.status(401).json({ message: error.message, success: false });
    }
}

module.exports = authMiddleware