const express = require('express')
const db = require('./models')

db.sequelize.authenticate()
    .then(() => console.log('Database connected ...'))
    .catch(err => console.log(`Error: ${err}`))
const app = express()

app.get('/', (req, res) => {
    res.send('backend up')
})

port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})
