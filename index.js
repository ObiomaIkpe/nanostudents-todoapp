require('dotenv').config()
const express = require("express")
// const swaggerUi = require('swagger-ui-express')
const cookieParser = require("cookie-parser")
const app = express()


const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/notesRoutes')
// const swaggerOptions = require('./swaggerOptions')
const connectDB = require('./DB/db')
const AppError = require('./middlewares/AppError')


app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("nowww")
})

//serve swagger UI at any url of your choice, we'll use /api-docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/notes', noteRoutes)


// app.use('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });







//global error handler
// this will catch all errors that are passed to next(err) in the app
// or any errors that are thrown in the app
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // production mode
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});


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