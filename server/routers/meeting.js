const express = require('express')
const router = new express.Router()
const db = require('../models')
const Meeting = require('../models/Meeting')

router.get('/', (req, res) => {
    res.send('backend up')
})
module.exports = router