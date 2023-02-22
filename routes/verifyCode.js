'use strict'

const {verifyCodeShcema} = require('../schema/sendVerificationCodeSchema')

module.exports = async function (fastify, opts) {
  fastify.post('/verifycode', verifyCodeShcema, async function (request, reply) {

    const { redis } = fastify
    const {phoneNumber, code} = request.body

    const storedCode = await redis.get(`sendCode ${phoneNumber}`)
    redis.del(`sendCode ${phoneNumber}`)

    const token = await fastify.jwt.sign({phoneNumber, code});
    
    if (storedCode === code) {
      return `This is your token ${token}`
    }
  })
}