const User = require('../models/userSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AppError = require('../middlewares/AppError')


const signup = async (req, res, next) => {
    const {username,email, password} = req.body
    
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            // return res.status(400).message("error, all fields must be filled!")
            throw new Error('incomplete data sent, all fields must be filled!')
    }

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(200).json({message: 'sign up successful!', newUser})
    } catch (error) {
        console.log(error)
        next(new AppError('error signing up', 400))
        }
        
}


const login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(new AppError('error signing up', 400))
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return res.status(400).json("no user found")
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword){
            return res.status(400).message("invalid credentials")
        }

        const token = jwt.sign(
            {userId:validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d'});

            console.log(token)

        res.cookie('token', token, {
                httpOnly: true}).json({
                    validUser,
                    token
                }).status(200)


    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


const logout = async(req, res) => {
    res.clearCookie("token", {
        httpOnly: true
    }).status(200).json("logged-out successfully!")
}


module.exports = {login, signup, logout}
