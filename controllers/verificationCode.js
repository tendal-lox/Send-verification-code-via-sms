'use strict'

const router = require('express').Router()
const Redis = require("ioredis")
const redis = new Redis()
const jwt = require('jsonwebtoken')

router.post('/verify', async (req, res) => {
    const {phoneNumber, code} = req.body
    const DBPhoneNumber = () => `phoneNumber: ${phoneNumber}`
    const usersCodeInDB = await redis.get(DBPhoneNumber())

    if (!phoneNumber || !code) {
        res.sendStatus(400)
    }
    if (usersCodeInDB === code) {
        await redis.del(DBPhoneNumber())

        const token = jwt.sign({phoneNumber: DBPhoneNumber()}, process.env.SECRET_KEY)

        res.send(`welcome user, your token is ${token}`)
    }else {
        res.send('Something went wrong')
    }
})

module.exports = router