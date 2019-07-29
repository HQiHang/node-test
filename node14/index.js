const path = require('path')
const express = require('express')
const app = express()

app.get('/user', (req, res) => {
    res.send({
        name: '何其沆',
        age: 23,
        sex: '男'
    })
})

app.use(express.static(path.join(__dirname, 'public')));


app.listen(3003)