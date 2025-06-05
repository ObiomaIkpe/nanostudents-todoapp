require('dotenv').config()
const express = require("express")
const swaggerUi = require('swagger-ui-express')
const cookieParser = require("cookie-parser")
const app = express()


const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/notesRoutes')
const swaggerOptions = require('./swaggerOptions')
const connectDB = require('./DB/db')
const AppError = require('./middlewares/AppError')


app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("nowww")
})

//serve swagger UI at any url of your choice, we'll use /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/notes', noteRoutes)

ap.all('*', (req, res, next) => {
    // res.status(404).json({
    //     message: `can't find ${req.originalUrl} on this server`,
    // })
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use((req, res, next, err) => {

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {

        res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
    }else if (process.env.NODE_ENV === 'production') {
        //in production, we want to send as little information as possible to the client
        // In production, you might want to log the error to a file or monitoring service
        

        res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
    }
    
})



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