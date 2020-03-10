const express = require('express')
const db = require('./models')
const meetingRouter = require('./routers/meeting')

db.sequelize.authenticate()
    .then(() => console.log('Database connected ...'))
    .catch(err => console.log(`Error: ${err}`))

const app = express()
app.use(express.json())
app.use(meetingRouter)

port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})
