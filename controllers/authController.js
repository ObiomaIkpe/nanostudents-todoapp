const User = require('../models/userSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const signup = async (req, res) => {
    const {username,email, password} = req.body

    
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).message("error, all fields must be filled!")
    }

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.json({message: 'sign up successful!', newUser}).status(200)
    } catch (error) {
        console.log(error)
        return res.status(400).json("something went wrong", error)
        }
}


const login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        return res.status(400).message("error, all fields must be filled!")
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
