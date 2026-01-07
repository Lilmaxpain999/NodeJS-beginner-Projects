const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/students', require('./routes/api/students'))

app.listen(4040, () => {
    console.log("Server listening at http://localhost:4040")
})