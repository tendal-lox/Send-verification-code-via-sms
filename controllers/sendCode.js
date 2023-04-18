'use strict'

const router = require('express').Router()
const Redis = require("ioredis")
const redis = new Redis()
const { faker } = require('@faker-js/faker')
// const kavenegarMailSender = require('../service/keveNegarSendApi')

router.post('/sendCode', async (req, res) => {
    const {phoneNumber} = req.body
    const generatedCode = faker.random.numeric(5)
    const DBPhoneNumber = () => `phoneNumber: ${phoneNumber}`

    if (!phoneNumber) {
        res.sendStatus(400).send('Something went wrong')
    }
    
    await redis.setnx(DBPhoneNumber(), generatedCode)
    redis.expire(DBPhoneNumber(), 40)
    const codeStatus = await redis.get(DBPhoneNumber())

    if (codeStatus === generatedCode) {
        res.send({status: 'code sent', code: generatedCode})
    }else {
        res.send('Code already send')
    }

    // kavenegarMailSender(phoneNumber, generatedCode)

})

module.exports = router