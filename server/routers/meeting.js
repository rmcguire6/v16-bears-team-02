const express = require('express')
const router = new express.Router()
const db = require('../models')
const Meeting = require('../models/Meeting')

router.get('/', (req, res) => {
    res.send('backend up')
})
// Get all meetings
router.get('/meetings', (req, res) => {
    return db.Meeting.findAll()
        .then((meetings) => res.send(meetings))
        .catch((err) => {
            return res.status(500).send()
        })
})

// Create a meeting
router.post('/meetings', (req, res) => {
    const { name } = req.body
    return db.Meeting.create({ name })
        .then((meeting) => res.status(201).send(meeting))
        .catch((err) => {
            res.status(400).send(err)
        })
})

// Get a meeting by id
router.get('/meetings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Meeting.findByPk(id)
        .then((meeting) => res.send(meeting))
        .catch((err) => {
            res.status(500).send()
        })
})

// Delete a meeting
router.delete('/meetings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Meeting.findByPk(id)
        .then((meeting) => meeting.destroy())
        .then(() => res.send(id))
        .catch((err) => {
            res.status(400).send(err)
        })
})

module.exports = router