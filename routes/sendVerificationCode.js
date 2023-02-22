'use strict'

const {sendCodeShcema} = require('../schema/sendVerificationCodeSchema')
const { faker } = require('@faker-js/faker')
const Kavenegar = require('kavenegar')
const {validateGivenPhoneNumber} = require('../controller/phoneNumber')

module.exports = async function (fastify, opts) {
  fastify.post('/sendcode', sendCodeShcema, async function (request, reply) {
    const { redis } = fastify
    const {phoneNumber} = request.body
    const validatePhoneNumber = await validateGivenPhoneNumber(phoneNumber)

    if (!phoneNumber)
      reply.code(400).send('error happend')
    
    if (validatePhoneNumber === false)
      reply.send({Error: 'your phone number is not valid'})

    const storedCode = await redis.get(`sendCode ${phoneNumber}`)

    if (!storedCode) {
      const generateCode = faker.random.numeric(5)

      redis.setnx(`sendCode ${phoneNumber}`, generateCode)
      redis.expire(`sendCode ${phoneNumber}`, 20) 
      
      // Kavenegar send api
      const api = Kavenegar.KavenegarApi({apikey: 'api key from kavenegar'});
      api.Send({ message: generateCode , sender: "xxx" , receptor: phoneNumber })

      // return 'code sent'

      reply.send(generateCode)
    }

    // problem with ioredis in test (uses for passing test only)
    // reply.send({phoneNumber: phoneNumber})
  })
}