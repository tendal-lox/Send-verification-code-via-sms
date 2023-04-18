'use strict'

const router = require('express').Router()
const jwt = require('jsonwebtoken')
const APIData = require('../service/APICall')

router.get('/controlFlowOfData', async (req, res) => {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY, async (err, status) => {
        if (err) {
            res.send(err)
        }
        await APIData()
        res.send(`Hello user ${status.phoneNumber}, data is in your redis data base. Check your terminal`)
    })
})

module.exports = router