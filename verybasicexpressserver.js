const express = require("express");


const app = express()
// app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1>hello from the server side!!!!!!!!!!</h1>"
    )
})


app.listen(7000, () => {
    console.log("hello from the server side")
})