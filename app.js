'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const {swaggerSchema, swaggerUISchema} = require('./schema/swaggerSchema')
const fastifyJwt = require('@fastify/jwt/jwt')

module.exports.options = {}

module.exports = async function (fastify, opts) {

  fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret'
  })

  fastify.decorate('authentication', async (req, reply) => {
    try{
      await req.jwtVerify()
    }catch (err) {
      reply.send(err)
    }
  })

  await fastify.register(require('@fastify/swagger'), {swagger: swaggerSchema})

  await fastify.register(require('@fastify/swagger-ui'), swaggerUISchema)

  fastify.register(require('@fastify/redis'))

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
