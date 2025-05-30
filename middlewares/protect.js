const jwt  = require("jsonwebtoken")



const protect = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: "You are unauthorized. Invalid token."})
    }

    token = authHeader.split(' ')[1];

    if(!token){
        console.log("error, no token provided!")
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if(err){
            console.log(err)
        }
        console.log (user)
            req.user = user
        next()
        })
    }

module.exports = protect