require('dotenv').config()
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/notesRoutes')
const connectDB = require('./DB/db')


app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    console.log("nowww")
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/notes', noteRoutes)



const start = async () => {
    try {
        await connectDB(process.env.DB_URI)
        app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
    } catch (error) {
        console.log(error)
    }    
}

start()